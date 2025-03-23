import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../utils/formatDate';
import { API_URL } from '../config';

const PostScreen = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/posts/${id}`);
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        setLoadingDelete(true);
        
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        await axios.delete(`${API_URL}/api/posts/${id}`, config);
        
        setLoadingDelete(false);
        navigate('/my-posts');
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete post');
        setLoadingDelete(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-10">Post not found</div>;
  }

  const isAuthor = user && post.user && user._id === post.user._id;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
      
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full max-h-96 object-cover rounded-lg mb-6"
        />
      )}
      
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex justify-between items-center text-gray-600 mb-6">
        <p>By {post.user?.name || 'Unknown'}</p>
        <p>{formatDate(post.createdAt)}</p>
      </div>
      
      {post.tags && post.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="prose max-w-none my-8">
        {post.content.split('\n').map((paragraph, index) => (
          paragraph ? <p key={index} className="mb-4">{paragraph}</p> : <br key={index} />
        ))}
      </div>
      
      {isAuthor && (
        <div className="flex gap-4 mt-8">
          <Link 
            to={`/post/${post._id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Post
          </Link>
          <button 
            onClick={deleteHandler}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loadingDelete}
          >
            {loadingDelete ? 'Deleting...' : 'Delete Post'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostScreen;