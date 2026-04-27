import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EditRestaurantPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        location: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    console.log("Restaurant ID:", id);

    useEffect(() => {
        if (!id) {
            setError("Restaurant ID is missing.");
            return;
        }

        const loadRestaurant = async () => {
            try {
                const response = await fetch(`http://localhost:3000/restaurants/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch restaurant');
                }

                setFormData({
                    name: data.name || '',
                    location: data.location || ''
                });
            } catch (error) {
                setError(error.message);
            }
        };

        loadRestaurant();
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/restaurants/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update restaurant');
            }

            setMessage('Restaurant updated successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Edit Restaurant</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
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

                <button type="submit">Update Restaurant</button>
            </form>
        </div>
    );
}

export default EditRestaurantPage;