import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { debounce, createCustomStyleProperties } from './util';
import { DummyRow } from './dummy-row';
import { Cell } from './cell';
import './styles.css';

export type Props = {
	itemCount: number;
	rowHeight: number;
	cellWidth: number;
	debounceDelay?: number;
	prerenderScreens?: number;
	gridGap?: number;
	gridHeight?: string | number;
	className?: string;
	children(index: number, rowIndex: number, columnIndex: number): React.ReactNode;
};

export const VirtualizedGrid = (props: Props) => {
	const gridRef = useRef<HTMLDivElement>(null);
	const previousScroll = useRef({ value: 0 });
	const [config, setConfig] = useState({ rows: 0, columns: 0 });
	const [fromTo, setFromTo] = useState({ from: 0, to: 30 });

	const debounceDelay = props.debounceDelay ?? 300;
	const prerenderScreens = props.prerenderScreens ?? 3;
	const gridGap = props.gridGap ?? 0;

	const getGridHeight = () => {
		if (!props.gridHeight) {
			return '100vh';
		}
		if (typeof props.gridHeight === 'string') {
			return props.gridHeight;
		} else {
			return `${props.gridHeight}px`;
		}
	};

	useLayoutEffect(() => {
		if (gridRef.current && previousScroll.current.value !== gridRef.current.scrollTop) {
			gridRef.current.scrollTop = previousScroll.current.value;
		}
	}, [previousScroll.current.value]);

	useEffect(() => {
		if (gridRef.current) {
			const columns = Math.floor(gridRef.current.clientWidth / (props.cellWidth + gridGap));
			const rows = Math.ceil(props.itemCount / columns);
			setConfig({ columns, rows });
		}
	}, [gridGap, props.cellWidth, props.itemCount]);

	useEffect(() => {
		const ref = gridRef.current;
		const resizeCallback = debounce(() => {
			const ref = gridRef.current;
			if (ref) {
				const columns = Math.floor(ref.clientWidth / (props.cellWidth + gridGap));
				const rows = Math.ceil(props.itemCount / columns);
				setConfig({ columns, rows });
			}
		}, 0);
		let resizeObserver = new ResizeObserver(resizeCallback);

		ref && resizeObserver.observe(ref);
		return () => {
			ref && resizeObserver.unobserve(ref);
		};
	}, [gridGap, props.cellWidth, props.debounceDelay, props.itemCount]);

	const db = debounce((params: { scrollTop: number; clientHeight: number }) => {
		const maxVisibleRows = Math.ceil(params.clientHeight / (props.rowHeight + gridGap));
		const from = Math.max(0, Math.floor(params.scrollTop / (props.rowHeight + gridGap)) - maxVisibleRows * prerenderScreens);
		const to = Math.min(config.rows, from + maxVisibleRows * (prerenderScreens * 2 + 1));

		if (from > to) {
			setFromTo({ from: config.rows - (fromTo.to - fromTo.from), to: config.rows });
		} else {
			setFromTo({ from, to });
		}
	}, debounceDelay);

	const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
		db(event.currentTarget);

		if (gridRef.current) {
			previousScroll.current.value = gridRef.current.scrollTop;
		}
	};

	const renderCells = (): React.ReactNode => {
		return [...Array(fromTo.to - fromTo.from)].map((_, rowIndex) =>
			[...Array(config.columns)].map((_, cellIndex) => {
				const index = (rowIndex + fromTo.from) * config.columns + cellIndex;
				return index < props.itemCount ? (
					<Cell key={cellIndex} height={props.rowHeight}>
						{props.children(index, rowIndex + fromTo.from, cellIndex)}
					</Cell>
				) : null;
			})
		);
	};

	const renderDummyRow = (rowCount: number, condition = true): React.ReactNode => {
		if (condition) {
			return <DummyRow columns={config.columns} rows={rowCount} rowHeight={props.rowHeight} gapSize={gridGap} />;
		}
		return null;
	};

	const style = createCustomStyleProperties([
		['grid-gap', `${props.gridGap}px`],
		['grid-height', getGridHeight()],
		['grid-columns', `repeat(${config.columns}, minmax(${props.cellWidth}px, 1fr))`],
	]);

	return (
		<div className={`container ${props.className ?? ''}`} ref={gridRef} style={style} onScroll={handleScroll}>
			{renderDummyRow(fromTo.from, fromTo.from > 0)}
			{renderCells()}
			{renderDummyRow(config.rows - fromTo.to, fromTo.to < config.rows)}
		</div>
	);
};
