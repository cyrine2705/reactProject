import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { getAllPosts, addPost as apiAddPost, editPost as apiEditPost, deletePost as apiDeletePost, type Post, type PostInput } from '../service/api';

interface PostContextType {
    posts: Post[];
    loading: boolean;
    addNewPost: (post: PostInput) => Promise<void>;
    updatePost: (id: number | string, post: PostInput) => Promise<void>;
    removePost: (id: number | string) => Promise<void>;
    getPostById: (id: number | string) => Post | undefined;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const addNewPost = async (postInput: PostInput) => {
        try {
            const newPost = await apiAddPost(postInput);
            const localPost = { ...newPost, id: Math.floor(Math.random() * 10000) + 100 };
            setPosts(prev => [localPost, ...prev]);
        } catch (error) {
            console.error("Error adding post:", error);
            throw error;
        }
    };

    const updatePost = async (id: number | string, postInput: PostInput) => {
        try {

            if (typeof id === 'number' && id <= 100) {
                await apiEditPost(id, postInput);
            }
            setPosts(prev => prev.map(p => p.id == id ? { ...p, ...postInput } : p));
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    };

    const removePost = async (id: number | string) => {
        try {
            if (typeof id === 'number' && id <= 100) {
                await apiDeletePost(id);
            }
            setPosts(prev => prev.filter(p => p.id != id));
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    };

    const getPostById = (id: number | string) => {
        return posts.find(p => p.id == id);
    };

    return (
        <PostContext.Provider value={{ posts, loading, addNewPost, updatePost, removePost, getPostById }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
};
