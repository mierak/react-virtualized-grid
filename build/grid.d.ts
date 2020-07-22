import React from 'react';
declare type Props = {
    itemCount: number;
    rowHeight: number;
    cellWidth: number;
    debounceDelay?: number;
    prerenderRows?: number;
    gridGap?: number;
    className?: string;
    children(index: number, rowIndex: number, columnIndex: number): React.ReactNode;
};
export declare const VirtualizedGrid: (props: Props) => JSX.Element;
export {};
