import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';

const AddPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addNewPost } = usePosts();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addNewPost({ userId: 1, title, body });
            navigate('/');
        } catch (error) {
            console.error("Error adding post:", error);
            alert("Failed to add post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Add New Post</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter post title"
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="body" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Content</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                            rows={6}
                            placeholder="Enter post content"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                        {loading ? 'Creating...' : 'Create Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
