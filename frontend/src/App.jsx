import { AppRouter } from './router/AppRouter';
import { AppTheme } from './config/theme/AppTheme';

export const App = () => {
  return (
    <>
      <AppTheme>{<AppRouter />}</AppTheme>
    </>
  );
};
