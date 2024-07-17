const blog = require('../models/blog');
4.3;
const dummy = (blogs) => {
  return 1;
};

//4.4
const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  });

  return sum;
};

//4.7
const mostLikes = (blogs) => {
  let mostLiked = { name: null, likes: -1 };
  blogs.forEach((blog) => {
    if (blog.likes > mostLiked.likes) {
      mostLiked = { author: blog.author, likes: blog.likes };
    }
  });
  return { author: mostLiked.author, likes: mostLiked.likes };
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
};
