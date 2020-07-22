import React from 'react';
import { getCellStyle } from './styles';

type Props = {
	index: number;
	children: React.ReactNode;
	height: number;
};

export const Cell: React.FunctionComponent<Props> = (props: Props) => {
	return <div style={getCellStyle(props.height)}>{props.children}</div>;
};
