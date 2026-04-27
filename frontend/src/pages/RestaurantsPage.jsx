import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState('');

    const loadRestaurants = async () => {
        try {
            const response = await fetch('http://localhost:3000/restaurants');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch restaurants');
            }

            setRestaurants(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        loadRestaurants();
    }, []);

    return (
        <div>
            <h1>Restaurants</h1>

            {error && <p>{error}</p>}

            {restaurants.length === 0 ? (
                <p>No restaurants found.</p>
            ) : (
                <ul>
                    {restaurants.map((restaurant) => (
                        <li key={restaurant._id}>
                            <strong>{restaurant.name}</strong> - {restaurant.location}{' '}
                            <Link to={`/restaurants/${restaurant._id}/edit`}>
                                Edit
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RestaurantsPage;