import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BlogPostList from '../BlogPostList';
import { blogApi } from '@/services/blogApi';

jest.mock('@/services/blogApi');
const mockedBlogApi = jest.mocked(blogApi);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

const mockPosts = [
  {
    userId: 1,
    id: 1,
    title: 'Test Post 1',
    body: 'This is the body of test post 1',
  },
  {
    userId: 1,
    id: 2,
    title: 'Test Post 2',
    body: 'This is the body of test post 2',
  },
];

describe('BlogPostList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    mockedBlogApi.getPosts.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<BlogPostList />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Loading blog posts...')).toBeInTheDocument();
  });

  test('renders blog posts when data is loaded', async () => {
    mockedBlogApi.getPosts.mockResolvedValue(mockPosts);

    render(<BlogPostList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Blog Posts')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('This is the body of test post 1')).toBeInTheDocument();
    expect(screen.getByText('This is the body of test post 2')).toBeInTheDocument();
  });

  test('renders error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch posts';
    mockedBlogApi.getPosts.mockRejectedValue(new Error(errorMessage));

    render(<BlogPostList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Failed to Load Posts')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('displays post IDs and user IDs', async () => {
    mockedBlogApi.getPosts.mockResolvedValue(mockPosts);

    render(<BlogPostList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Post ID: 1 | User ID: 1')).toBeInTheDocument();
      expect(screen.getByText('Post ID: 2 | User ID: 1')).toBeInTheDocument();
    });
  });

  test('renders empty state when no posts are returned', async () => {
    mockedBlogApi.getPosts.mockResolvedValue([]);

    render(<BlogPostList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('No Blog Posts Available')).toBeInTheDocument();
    });

    expect(screen.getByText('Check back later for new content, or try refreshing the page.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh Page' })).toBeInTheDocument();
  });
});