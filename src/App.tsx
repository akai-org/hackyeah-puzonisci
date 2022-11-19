import { Route, Routes, Navigate } from 'react-router-dom';
import { NotFoundPage, GamePage, CountPage, InfoPage } from './pages';
import { NavBar } from './components';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/info" />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/counter" element={<CountPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
