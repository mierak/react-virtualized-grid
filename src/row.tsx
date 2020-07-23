import React from 'react';

type Props = {
	children: React.ReactNode;
};

export const Row: React.FunctionComponent<Props> = ({ children }) => {
	return <>{children}</>;
};
