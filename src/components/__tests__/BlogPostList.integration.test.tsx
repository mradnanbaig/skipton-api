import { screen, waitFor } from '@testing-library/react';
import { render } from '@/test-utils/queryTestUtils';
import BlogPostList from '../BlogPostList';
import { blogApi } from '@/services/blogApi';

jest.mock('@/services/blogApi');
const mockedBlogApi = jest.mocked(blogApi);

const mockPosts = [
  {
    userId: 1,
    id: 1,
    title: 'Integration Test Post 1',
    body: 'This is the body of integration test post 1',
  },
  {
    userId: 2,
    id: 2,
    title: 'Integration Test Post 2',
    body: 'This is the body of integration test post 2',
  },
];

describe('BlogPostList TanStack Query Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('integrates with TanStack Query for data fetching', async () => {
    mockedBlogApi.getPosts.mockResolvedValue(mockPosts);

    render(<BlogPostList />);

    expect(screen.getByText('Loading blog posts...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Blog Posts')).toBeInTheDocument();
    });

    expect(screen.getByText('Integration Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Integration Test Post 2')).toBeInTheDocument();
  });

  test('handles empty API response with proper empty state', async () => {
    mockedBlogApi.getPosts.mockResolvedValue([]);

    render(<BlogPostList />);

    await waitFor(() => {
      expect(screen.getByText('No Blog Posts Available')).toBeInTheDocument();
    });

    expect(screen.getByText('Check back later for new content, or try refreshing the page.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh Page' })).toBeInTheDocument();
  });

  test('displays correct post count via TanStack Query', async () => {
    mockedBlogApi.getPosts.mockResolvedValue(mockPosts);

    render(<BlogPostList />);

    await waitFor(() => {
      expect(screen.getByText('Showing 2 blog posts')).toBeInTheDocument();
    });
  });

  test('TanStack Query error handling with retry functionality', async () => {
    const errorMessage = 'Network error from TanStack Query';
    mockedBlogApi.getPosts.mockRejectedValue(new Error(errorMessage));

    render(<BlogPostList />);

    await waitFor(() => {
      expect(screen.getByText('Failed to Load Posts')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });
});