import React from "react";
import PostCard from "../../components/feed/feed-ui/PostCard";
import NewPostFeature from "../../components/feed/new-post-feature";

const MOCK_POSTS = [
    {
        id: "1",
        creator: "wallet-address-1",
        content: "This is my first post!",
        timestamp: "2023-01-01T12:00:00Z",
    },
    {
        id: "2",
        creator: "wallet-address-2",
        content: "Welcome to the decentralized network!",
        timestamp: "2023-01-02T14:45:00Z",
    },
];

const FeedPage = () => {
    if (!Array.isArray(MOCK_POSTS)) {
        console.error("MOCK_POSTS is not an array or is undefined:", MOCK_POSTS);
        return <div>Error loading posts!</div>;
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Feed</h1>

            <NewPostFeature />

            <div className="feed mt-4 space-y-4">
                {MOCK_POSTS.map((post) => (
                    <PostCard
                        key={post.id}
                        post={{
                            creator: post.creator,
                            content: post.content,
                            timestamp: post.timestamp,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};


export default FeedPage;