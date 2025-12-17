import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import { usePosts } from '../context/PostContext';

const Posts: React.FC = () => {
    const { posts, loading, removePost } = usePosts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleDeleteClick = (id: number) => {
        setPostIdToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (postIdToDelete === null) return;

        try {
            await removePost(postIdToDelete);
            setIsModalOpen(false);
            setPostIdToDelete(null);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setPostIdToDelete(null);
    };

    return (
        <div className="container">
            <h1 className="text-3xl font-bold mb-6">All Posts</h1>
            {loading ? (
                <p>Loading posts...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {posts.map(post => (
                        <div key={post.id} className="card">
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{post.title}</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {post.body}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                                <Link to={`/posts/${post.id}`} className="btn btn-secondary">
                                    View
                                </Link>
                                <button onClick={() => navigate(`/edit/${post.id}`)} className="btn btn-secondary">
                                    Update
                                </button>
                                <button onClick={() => handleDeleteClick(post.id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Delete Post"
                message="Are you sure you want to delete this post?"
            />
        </div>
    );
};

export default Posts;
