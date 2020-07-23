import React from 'react';
import './styles.css';
import { createCustomStyleProperties } from './util';

type Props = {
	children: React.ReactNode;
	height: number;
};

export const Cell: React.FunctionComponent<Props> = (props: Props) => {
	const style = createCustomStyleProperties([['cell-height', `${props.height}px`]]);
	return (
		<div className='cell' style={style}>
			{props.children}
		</div>
	);
};
