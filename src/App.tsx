import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { NotFoundPage, GamePage, CounterPage, InfoPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/info" />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
