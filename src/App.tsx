import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { NotFoundPage, GamePage, CounterPage, InfoPage } from './pages';
import { NavBar } from './components/Layout/Navbar';
import { Container } from '@chakra-ui/react';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/info" />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
