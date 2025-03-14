// src/components/feed/feed-ui.tsx

import React from 'react';

// Props type for the PostCard component
type PostProps = {
    post: {
        id: string;       // Unique identifier for the post
        content: string;  // Content of the post
        author: string;   // Author of the post
        timestamp: string; // Timestamp of the post
    };
};

// Functional component to display a single post
const PostCard = ({ post }: PostProps) => {
    return (
        <div className="border p-4 rounded shadow-sm bg-gray-50">
            {/* Header: Author and timestamp */}
            <div className="mb-2 text-sm text-gray-600">
                <span className="text-blue-500 font-bold">@{post.author}</span>
                &nbsp;· {new Date(post.timestamp).toLocaleString()}
            </div>
            {/* Post content */}
            <div className="text-lg text-gray-800">{post.content}</div>
        </div>
    );
};

export default PostCard;