import asyncHandler from '../utils/asyncHandler.js';
import Post from '../models/postModel.js';

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags, image } = req.body;

  const post = new Post({
    title,
    content,
    image: image || '',
    tags: tags || [],
    user: req.user._id,
    published: true,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const publishedFilter = { published: true };
  const filters = { ...keyword, ...publishedFilter };

  const count = await Post.countDocuments(filters);
  const posts = await Post.find(filters)
    .populate('user', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get user posts
// @route   GET /api/posts/my
// @access  Private
const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', 'name');

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const { title, content, tags, image, published } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to edit this post');
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.image = image || post.image;
    post.published = published !== undefined ? published : post.published;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to delete this post');
    }

    // Changed post.remove() to Post.deleteOne() since remove() is deprecated
    await Post.deleteOne({ _id: post._id });
    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export {
  createPost,
  getPosts,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};