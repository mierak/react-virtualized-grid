import { StyleProperty } from './types';
export declare const debounce: (callback: (...args: any[]) => void, wait: any) => (...args: any[]) => void;
export declare const createCustomStyleProperties: (properties: [StyleProperty, string][]) => React.CSSProperties;
