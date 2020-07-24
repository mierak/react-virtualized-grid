# React Virtualized Grid

A simple layout component written using CSS Grid. Can be used to display a very large number of elements in a grid. This works by rendering only elements that are currently on the screen and a small portion before and after.

## Features

- A Simple CSS Grid to display a huge number of elements
- Almost identical performance for 10, 100 or 1 000 000 elements
- Responsive
- Zero dependency
- Written in Typescript

## Installation

```
npm i @mierak/react-virtualized-grid
```

## Usage

```js
import React from 'react';
import { VirtualizedGrid } from '@mierak/react-virtualized-grid';

export default () => {
	const elements = [...new Array(100000)].map((_, index) => index);

	return (
		<VirtualizedGrid itemCount={elements.length} rowHeight={50} cellWidth={100} gridHeight={300}>
			{(index) => <div>{elements[index]}</div>}
		</VirtualizedGrid>
	);
};
```

## Preview

![Preview](https://i.imgur.com/ZxAERje.gif 'Component preview')

## API

| Name             | Description                                                                                                              | Type                                                                      | Default | Required? |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ------- | --------- |
| children         | A callback function used to render your elements                                                                         | (index: number, rowIndex: number, columnIndex: number) => React.ReactNode | ---     | Yes       |
| itemCount        | Total count of items you want to display                                                                                 | number                                                                    | ---     | Yes       |
| rowHeight        | Height of a single row in the grid                                                                                       | number                                                                    | ---     | Yes       |
| cellWidth        | Width of a single cell in the grid                                                                                       | number                                                                    | ---     | Yes       |
| debounceDelay    | Time to wait before rendering elements after a scroll event in milliseconds                                              | number                                                                    | 300     | No        |
| prerenderScreens | Screens of elements to prerender to prevent blinking                                                                     | number                                                                    | 3       | No        |
| gridGap          | grid-gap CSS property                                                                                                    | number                                                                    | 0       | No        |
| gridHeight       | The height of the grid container. You can supply a number in px or a string as a CSS property, e.g. "calc(100% - 200px)" | number \| string                                                          | "100vh" | No        |
| className        | Your css class names to be added to grid container. Also servers for Styled components compatibility                     | number                                                                    | ---     | No        |

## Notes

You can use any of the parameters passed in the children callback to render your elements. Suggested way is to simply use an index. If you use rowIndex and columnIndex you must take care not to skip any cells in the resulting grid as it will cause it to malfunction.

## Limitations

- All elements must have equal size
- Currently there is no inbuilt way to render previews before element gets rendered after scrolling

## Licence

React Virtualized Grid is release under MIT licence.
