import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { type Post } from '../service/api';

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getPostById, loading: contextLoading } = usePosts();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (contextLoading) return; // Wait for context to load

        if (id) {
            const foundPost = getPostById(Number(id));
            setPost(foundPost || null);
            setLoading(false);
        }
    }, [id, contextLoading, getPostById]);

    if (loading) return <div className="container">Loading...</div>;
    if (!post) return <div className="container">Post does not exist</div>;

    return (
        <div className="container">
            <Link to="/" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>&larr; Back to Posts</Link>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '1rem' }}>{post.title}</h1>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{post.body}</p>
                <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', color: 'var(--text-secondary)' }}>
                    Post ID: {post.id}
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
