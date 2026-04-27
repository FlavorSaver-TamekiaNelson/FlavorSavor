import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EditFavoritePage() {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        item_name: '',
        rating: '',
        notes: '',
        photo_url: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadFavorite = async () => {
        try {
            const response = await fetch(`http://localhost:3000/favorites/${id}`);
            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch favorite');
            }

            setFormData({
            item_name: data.item_name || '',
            rating: data.rating || '',
            notes: data.notes || '',
            photo_url: data.photo_url || ''
            });
        } catch (error) {
            setMessage(error.message);
        }
        };

        loadFavorite();
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
        const response = await fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            item_name: formData.item_name,
            rating: Number(formData.rating),
            notes: formData.notes,
            photo_url: formData.photo_url
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update favorite');
        }

        setMessage('Favorite updated successfully');
        } catch (error) {
        setMessage(error.message);
        }
    };

    return (
        <div>
        <h1>Edit Favorite</h1>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
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

            <button type="submit">Update Favorite</button>
        </form>
        </div>
    );
}

export default EditFavoritePage;