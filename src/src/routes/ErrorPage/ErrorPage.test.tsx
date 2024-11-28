import { screen } from '@testing-library/react';
import { renderWithDeps } from '../../../jest.utils.tsx';
import ErrorPage from './ErrorPage';

describe('<ErrorPage />', () => {
	test('it should mount', () => {
		renderWithDeps(<ErrorPage/>);

		const errorPage = screen.getByTestId('ErrorPage');

		expect(errorPage).toBeVisible();
	});
});
