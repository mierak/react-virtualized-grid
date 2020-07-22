export const getGridContainerStyle = (columns: number, cellWidth: number, gridGap: number): React.CSSProperties => {
	return {
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, minmax(${cellWidth}px, 1fr)`,
		gridGap: `${gridGap}px`,
		marginLeft: 'auto',
		marginRight: 'auto',
		overflowY: 'auto',
		border: '1px solid black',
		width: '100%',
	};
};

export const dummyCellStyle: React.CSSProperties = {
	// position: 'relative',
	// marginTop: '-1px',
};

export const getCellStyle = (height: number): React.CSSProperties => {
	return {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: height,
		boxSizing: 'border-box',
		// border: '1px solid black',
	};
};
