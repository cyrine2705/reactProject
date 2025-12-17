import axios from 'axios';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostInput {
    userId: number;
    title: string;
    body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getAllPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(API_URL);
    return response.data;
};

export const getPost = async (id: number | string): Promise<Post> => {
    const response = await axios.get<Post>(`${API_URL}/${id}`);
    return response.data;
};

export const addPost = async (post: PostInput): Promise<Post> => {
    const response = await axios.post<Post>(API_URL, post);
    return response.data;
};

export const editPost = async (id: number | string, post: PostInput): Promise<Post> => {
    const response = await axios.put<Post>(`${API_URL}/${id}`, post);
    return response.data;
};

export const deletePost = async (id: number | string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
