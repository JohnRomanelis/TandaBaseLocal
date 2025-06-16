import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-red-400" : "hover:text-red-300 transition";

  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-bold text-red-600">TandaBase</h1>
      <nav className="flex space-x-6 text-sm font-medium">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/songs" className={linkClass}>Songs</NavLink>
        <NavLink to="/tandas" className={linkClass}>Tandas</NavLink>
        <NavLink to="/playlists" className={linkClass}>Playlists</NavLink>
        <NavLink to="/maintenance" className={linkClass}>Maintenance</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
