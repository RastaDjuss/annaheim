export class Post {
}

// src/components/feed/feed-data-access.tsx
export async function fetchFeedPosts(): Promise<Post[]> {
    try {
        const response = await fetch('/api/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();

        // Returning normalized posts for UI consumption
        return data.posts.map((post: any) => ({
            id: post.id,
            content: post.content,
            author: post.author,
            timestamp: post.timestamp,
        })) as Post[];
    } catch (error) {
        console.error('Error fetching feed posts:', error);
        throw error;
    }
}