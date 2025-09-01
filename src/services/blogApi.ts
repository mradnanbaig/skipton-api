import { BlogPost } from '@/types/blog';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const blogApi = {
  async getPosts(): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  async getPost(id: number): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post ${id}`);
    }
    return response.json();
  },
};