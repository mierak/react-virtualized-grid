import { StyleProperty } from './types';

export const debounce = (callback: (...args: any[]) => void, wait: any): ((...args: any[]) => void) => {
	let timeout: any;
	return function (this: unknown, ...args: any[]) {
		const functionCall = () => callback.apply(this, args);
		clearTimeout(timeout);
		timeout = setTimeout(functionCall, wait);
	};
};

export const createCustomStyleProperties = (properties: [StyleProperty, string][]): React.CSSProperties => {
	const obj: { [key: string]: string } = {};
	properties.forEach((property) => {
		obj[`--${property[0]}`] = property[1];
	});
	return obj;
};
