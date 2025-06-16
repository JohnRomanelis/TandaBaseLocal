import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Songs from "./pages/Songs";


const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-neutral-900 min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholders for future routes */}
          <Route path="/songs" element={<Songs />} />
          <Route path="/tandas" element={<div className="p-6">Tandas Page</div>} />
          <Route path="/playlists" element={<div className="p-6">Playlists Page</div>} />
          <Route path="/maintenance" element={<div className="p-6">Maintenance Page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
