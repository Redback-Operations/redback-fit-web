import { screen } from '@testing-library/react';
import { MockRouterProvider } from '../../../test-mocks/mock-providers.tsx';
import { renderWithDeps } from '../../../jest.utils.tsx';
import Root from './Root';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useRouteError: jest.fn().mockImplementation(() => null),
}));

describe('<Root />', () => {
	it('renders', () => {
		renderWithDeps(
			<MockRouterProvider>
				<Root/>
			</MockRouterProvider>
		);

		const root = screen.getByTestId('Root');

		expect(root).toBeVisible();
	});
});
