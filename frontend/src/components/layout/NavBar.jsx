import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-left">
        <NavLink to="/" className="logo-link">
          <h2>Flavor Savor</h2>
        </NavLink>
      </div>

      <div className="nav-links">
        <NavLink to="/restaurants">Restaurants</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </div>

    </nav>
  )
}