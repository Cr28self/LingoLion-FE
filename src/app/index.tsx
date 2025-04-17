import AppProvider from './provider';
import AppRouter from './routes';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
