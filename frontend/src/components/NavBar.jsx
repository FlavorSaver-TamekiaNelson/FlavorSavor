import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/users">Users</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/restaurants/add">Add Restaurant</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/favorites/add">Add Favorite</Link>
        </nav>
    );
}

export default NavBar;