import React from 'react';
import './styles.css';
export declare type Props = {
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
export declare const VirtualizedGrid: (props: Props) => JSX.Element;
