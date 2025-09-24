import { FC, useContext } from 'react';
import { GlobalHeader, RootWrapper } from './Root.style';
import { Outlet, useRouteError } from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage.tsx';
import { ThemeContext } from '../../context/ThemeContext';

const Root: FC = () => {
  const error = useRouteError();
  const { theme } = useContext(ThemeContext);

  return (
    <RootWrapper className={theme} data-testid="Root">
      <GlobalHeader data-testid="GlobalHeader">
        <ul>{/* optional nav */}</ul>
      </GlobalHeader>

      {/* 🔹 NEW universal wrapper — present on every route */}
      <div id="app-root" className="pageShell">
        {error ? <ErrorPage /> : <Outlet />}
      </div>
    </RootWrapper>
  );
};

export default Root;
