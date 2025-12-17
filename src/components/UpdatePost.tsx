import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';

const UpdatePost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getPostById, updatePost } = usePosts();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const post = getPostById(Number(id));
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [id, getPostById]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setLoading(true);
        try {
            await updatePost(Number(id), { userId: 1, title, body });
            navigate('/');
        } catch (error) {
            console.error("Error updating post:", error);
            setLoading(false);
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h1 className="text-3xl font-bold mb-6">Update Post</h1>
            <form onSubmit={handleSubmit} className="card">
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Body</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="input"
                        rows={6}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;
