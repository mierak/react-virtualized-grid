import React from 'react';

type Props = {
	children: React.ReactNode;
	index: number;
};

export const Row: React.FunctionComponent<Props> = ({ children }) => {
	return <>{children}</>;
};
