import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem('token'))
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="logo-link">
          <h2>Flavor Savor</h2>
        </NavLink>
      </div>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <NavLink to="/restaurants">Restaurants</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}