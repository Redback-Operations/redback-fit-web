import { FC } from 'react';
import { ErrorPageWrapper } from './ErrorPage.style';
import { useRouteError } from 'react-router-dom';

// React Router's error is not typed out of the box, it's 'unknown', but this is what it is
type RouterError = {
	status: number;
	statusText: string;
	data: string;
	internal: boolean;
	error: Error
};

const ErrorPage: FC = () => {
	const error: RouterError = useRouteError() as RouterError;
	console.log(error);

	return (
		<ErrorPageWrapper data-testid="ErrorPage">
			<h1>{error.status} {error.statusText}</h1>
			<p>{error.data}</p>
		</ErrorPageWrapper>
	);
};

export default ErrorPage;
