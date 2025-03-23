import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { API_URL } from '../config';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/posts`);
        // Make sure to access the posts property from the response
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.response?.data?.message || 'Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      
      {!posts || posts.length === 0 ? (
        <div className="text-center py-10">
          <p>No posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;