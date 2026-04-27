import { useEffect, useState } from 'react';

function AddFavoritePage() {
    const [users, setUsers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        user_id: '',
        restaurant_id: '',
        item_name: '',
        rating: '',
        notes: '',
        photo_url: ''
    });

    useEffect(() => {
        fetch('http://localhost:3000/users')
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error(err));

        fetch('http://localhost:3000/restaurants')
        .then((res) => res.json())
        .then((data) => setRestaurants(data))
        .catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            user_id: Number(formData.user_id),
            restaurant_id: Number(formData.restaurant_id),
            item_name: formData.item_name,
            rating: Number(formData.rating),
            notes: formData.notes,
            photo_url: formData.photo_url
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to add favorite');
        }

        setMessage('Favorite added successfully');
        setFormData({
            user_id: '',
            restaurant_id: '',
            item_name: '',
            rating: '',
            notes: '',
            photo_url: ''
        });
        } catch (error) {
        setMessage(error.message);
        }
    };

    return (
        <div>
        <h1>Add Favorite</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
            <div>
            <label>User: </label>
            <select name="user_id" value={formData.user_id} onChange={handleChange} required>
                <option value="">Select User</option>
                {users.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.email}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label>Restaurant: </label>
            <select
                name="restaurant_id"
                value={formData.restaurant_id}
                onChange={handleChange}
                required
            >
                <option value="">Select Restaurant</option>
                {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label>Item Name: </label>
            <input
                type="text"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                required
            />
            </div>

            <div>
            <label>Rating: </label>
            <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                required
            />
            </div>

            <div>
            <label>Notes: </label>
            <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
            />
            </div>

            <div>
            <label>Photo URL: </label>
            <input
                type="text"
                name="photo_url"
                value={formData.photo_url}
                onChange={handleChange}
            />
            </div>

            <button type="submit">Add Favorite</button>
        </form>
        </div>
    );
}

export default AddFavoritePage;