import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const PostEditScreen = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPost = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        const { data } = await axios.get(`${API_URL}/api/posts/${id}`, config);
        
        // Check if user is the author
        if (user._id !== data.user._id) {
          navigate('/');
          return;
        }
        
        setTitle(data.title);
        setContent(data.content);
        setImage(data.image || '');
        setTags(data.tags ? data.tags.join(', ') : '');
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      setError(null);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);
      
      await axios.put(
        `${API_URL}/api/posts/${id}`,
        {
          title,
          content,
          image,
          tags: tagsArray,
        },
        config
      );
      
      setUpdating(false);
      setSuccess(true);
      
      // Redirect after short delay
      setTimeout(() => {
        navigate(`/post/${id}`);
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update post');
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
          Post updated successfully! Redirecting...
        </div>
      )}
      
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2 text-sm font-medium">
            Image URL (optional)
          </label>
          <input
            type="text"
            id="image"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="tags" className="block mb-2 text-sm font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. technology, programming, web development"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(`/post/${id}`)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditScreen;