import { useQuery } from '@tanstack/react-query';
import { blogApi } from '@/services/blogApi';

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: blogApi.getPosts,
  });
};