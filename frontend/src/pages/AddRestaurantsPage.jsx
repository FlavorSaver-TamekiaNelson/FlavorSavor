import { useState } from 'react';

function AddRestaurantPage() {
    const [formData, setFormData] = useState({
        name: '',
        location: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:3000/restaurants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to add restaurant');
        }

        setMessage('Restaurant added successfully');
        setFormData({ name: '', location: '' });
        } catch (error) {
        setMessage(error.message);
        }
    };

    return (
        <div>
        <h1>Add Restaurant</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
            <div>
            <label>Name: </label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            </div>

            <div>
            <label>Location: </label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />
            </div>

            <button type="submit">Add Restaurant</button>
        </form>
        </div>
    );
}

export default AddRestaurantPage;