import { Button } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/info" element={<div>info</div>} />
        <Route path="/counter" element={<div>counter</div>} />
        <Route path="/game" element={<div>giera</div>} />
        <Route path="/*" element={<div>not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
