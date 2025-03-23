// src/components/PostCard.jsx
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link to={`/post/${post._id}`} className="text-blue-600 hover:text-blue-800">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-700 mb-4">
          {post.content.substring(0, 150)}
          {post.content.length > 150 && '...'}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>By {post.user?.name || 'Unknown'}</p>
          <p>{formatDate(post.createdAt)}</p>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;