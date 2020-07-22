import React from 'react';

type Props = {
	columns: number;
	rows: number;
	rowHeight: number;
	gapSize: number;
};

export const DummyRow: React.FunctionComponent<Props> = ({ columns, rows, rowHeight, gapSize }: Props) => {
	return (
		<>
			{[...Array(columns)].map((_, index) => (
				<div key={index} style={{ height: rows * (rowHeight + gapSize) }} />
			))}
		</>
	);
};
