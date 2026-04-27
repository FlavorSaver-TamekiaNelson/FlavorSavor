import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');

    const loadFavorites = async () => {
        try {
        const response = await fetch('http://localhost:3000/favorites/details/all');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch favorites');
        }

        setFavorites(data);
        } catch (err) {
        setError(err.message);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleDelete = async (id) => {
        try {
        const response = await fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete favorite');
        }

        loadFavorites();
        } catch (err) {
        setError(err.message);
        }
    };

    return (
        <div>
        <h1>Favorites</h1>

        {error && <p>{error}</p>}

        {favorites.length === 0 ? (
            <p>No favorites found.</p>
        ) : (
            <ul>
            {favorites.map((favorite) => (
                <li key={favorite.id}>
                <strong>{favorite.item_name}</strong> from {favorite.restaurant_name} by {favorite.email} - Rating: {favorite.rating}{' '}
                <Link to={`/favorites/${favorite.id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(favorite.id)}>Delete</button>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}

export default FavoritesPage;