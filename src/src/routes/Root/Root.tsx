// If not already correctly set, adjust the styled components for layout.
import { FC } from 'react';
import { GlobalHeader, RootWrapper } from './Root.style';
import { Outlet, useRouteError } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage.tsx';

const Root: FC = () => {
	const error = useRouteError();

	return (
		<RootWrapper data-testid="Root">
			<GlobalHeader data-testid="GlobalHeader">
				<ul>
				    {/* <li><Link to="/">Home</Link></li>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/contact">Contact</Link></li>
					<li><Link to="/login">Login</Link></li>
					<li><Link to="/dashboard">Dashboard</Link></li> */}
				</ul>
			</GlobalHeader>
			{error ? <ErrorPage /> : <Outlet />}
		</RootWrapper>
	);
};

export default Root;
