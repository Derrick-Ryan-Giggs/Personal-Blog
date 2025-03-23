import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const CreatePostScreen = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
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
      
      const { data } = await axios.post(
        `${API_URL}/api/posts`,
        {
          title,
          content,
          image: image || undefined,
          tags: tagsArray,
        },
        config
      );
      
      setLoading(false);
      navigate(`/post/${data._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
      
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
            placeholder="https://example.com/image.jpg"
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
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostScreen;