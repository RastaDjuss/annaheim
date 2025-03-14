// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';

const mockPosts = [
    {
        id: '1',
        content: 'Welcome to Anarcrypt Social Governing Platform: AnAHeiM!',
        author: 'user123',
        timestamp: new Date().toISOString(),
    },
    {
        id: '2',
        content: 'This is a second test post.',
        author: 'user789',
        timestamp: new Date().toISOString(),
    },
];

// Handle GET request to `/api/posts`
export async function GET() {
    return NextResponse.json({ posts: mockPosts });
}