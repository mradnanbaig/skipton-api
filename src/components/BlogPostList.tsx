'use client';

import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogPost } from '@/types/blog';
import Card from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

interface BlogPostItemProps {
  post: BlogPost;
}

function BlogPostItem({ post }: BlogPostItemProps) {
  return (
    <Card as="article" className="focus:outline-none">
      <Heading 
        level={2} 
        id={`post-${post.id}`}
        className="mb-3 capitalize"
      >
        {post.title}
      </Heading>
      <Text className="mb-4">
        {post.body}
      </Text>
      <Text variant="small" className="text-neutral-500">
        <span className="sr-only">Post metadata: </span>
        Post ID: {post.id} | User ID: {post.userId}
      </Text>
    </Card>
  );
}

export default function BlogPostList() {
  const { data: posts, isLoading, error } = useBlogPosts();

  if (isLoading) {
    return (
      <div 
        className="flex justify-center items-center min-h-64"
        role="status"
        aria-live="polite"
        aria-label="Loading blog posts"
      >
        <div className="flex items-center space-x-3">
          <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full" />
          <Text variant="large" className="text-neutral-600">
            Loading blog posts...
          </Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="flex flex-col justify-center items-center min-h-64 text-center px-4"
        role="alert"
        aria-live="assertive"
      >
        <Heading level={2} className="text-red-600 mb-4">
          Failed to Load Posts
        </Heading>
        <Text className="text-red-600 mb-6">
          {error.message}
        </Text>
        <Button 
          onClick={() => window.location.reload()}
          variant="primary"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <Heading level={1} className="mb-2">
            Blog Posts
          </Heading>
          <Text className="text-neutral-600">
            Discover interesting articles and insights from our community
          </Text>
        </header>
        
        <div 
          className="flex flex-col justify-center items-center min-h-64 text-center px-4"
          role="status"
          aria-live="polite"
        >
          <div className="w-16 h-16 mb-6 text-neutral-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <Heading level={2} className="text-neutral-700 mb-4">
            No Blog Posts Available
          </Heading>
          <Text className="text-neutral-600 mb-6 max-w-md">
            Check back later for new content, or try refreshing the page.
          </Text>
          <Button 
            onClick={() => window.location.reload()}
            variant="secondary"
          >
            Refresh Page
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <Heading level={1} className="mb-2">
          Blog Posts
        </Heading>
        <Text className="text-neutral-600">
          Discover interesting articles and insights from our community
        </Text>
      </header>
      
      <section 
        aria-label="Blog post list"
        className="space-y-6"
      >
        <div className="sr-only" aria-live="polite">
          {posts?.length ? `Showing ${posts.length} blog posts` : 'No posts available'}
        </div>
        {posts?.map((post) => (
          <BlogPostItem 
            key={post.id} 
            post={post}
          />
        ))}
      </section>
    </main>
  );
}