import { blogApi } from '../blogApi';

global.fetch = jest.fn();
const mockedFetch = jest.mocked(fetch);

describe('blogApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    test('fetches posts successfully', async () => {
      const mockPosts = [
        { userId: 1, id: 1, title: 'Test Post', body: 'Test Body' },
      ];

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPosts),
      } as unknown as Response);

      const result = await blogApi.getPosts();

      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
      expect(result).toEqual(mockPosts);
    });

    test('throws error when fetch fails', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
      } as unknown as Response);

      await expect(blogApi.getPosts()).rejects.toThrow('Failed to fetch posts');
    });
  });

  describe('getPost', () => {
    test('fetches single post successfully', async () => {
      const mockPost = { userId: 1, id: 1, title: 'Test Post', body: 'Test Body' };

      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPost),
      } as unknown as Response);

      const result = await blogApi.getPost(1);

      expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
      expect(result).toEqual(mockPost);
    });

    test('throws error when fetch fails', async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
      } as unknown as Response);

      await expect(blogApi.getPost(1)).rejects.toThrow('Failed to fetch post 1');
    });
  });
});