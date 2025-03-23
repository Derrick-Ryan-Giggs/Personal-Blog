import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { API_URL } from '../config';

const MyPostsScreen = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPosts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        const { data } = await axios.get(`${API_URL}/api/posts/my`, config);
        // Your backend returns an array directly, not an object with a posts property
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.response?.data?.message || 'Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, navigate]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Blog Posts</h1>
        <Link
          to="/create-post"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Post
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="mb-4">You haven't created any posts yet.</p>
          <Link
            to="/create-post"
            className="text-blue-600 hover:underline"
          >
            Create your first post
          </Link>
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

export default MyPostsScreen;