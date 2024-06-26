import React, { useEffect, useState } from 'react';
import fetchTumblrPosts from '../src/tumblrService';
import styles from './Blog.module.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [tag, setTag] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogName = 'nataliya-dionova'; // Replace with your actual blog name
        const fetchedPosts = await fetchTumblrPosts(blogName, tag);
        console.log('Fetched Posts:', fetchedPosts);
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error fetching Tumblr posts:', err);
        setError('Failed to fetch posts. Please try again later.');
      }
    };
    fetchData();
  }, [tag]);

  const handleLike = (postId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(postId)) {
        newFavorites.delete(postId);
      } else {
        newFavorites.add(postId);
      }
      return newFavorites;
    });
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  if (error) {
    return <div className={styles.Blog}><p>{error}</p></div>;
  }

  return (
    <div className={styles.Blog}>
      <h1>Blog Page</h1>
      <input type="text" placeholder="Enter tag to filter" value={tag} onChange={handleTagChange} />
      <div className={styles.imageGrid}>
        {posts.length === 0 && <p>No posts available.</p>}
        {posts.map((post) => (
          <div key={post.id} className={styles.imageItem}>
            {post.photos && post.photos.length > 0 ? (
              <img src={post.photos[0].original_size.url} alt={post.summary || 'Image'} />
            ) : (
              <p>No image available</p>
            )}
            <button onClick={() => handleLike(post.id)}>
              {favorites.has(post.id) ? 'Unlike' : 'Like'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;