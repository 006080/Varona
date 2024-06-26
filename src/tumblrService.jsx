import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

const DUMMY_CREDENTIALS = {
  consumer_key: '8H8nGXQ1hAylANpYBcyI6c1haNxkPvZcZpKkTbA9ODBkxVJQfn',
  consumer_secret: 'PFMdFmwGOjFTvtJWOvkJn7PJyoYTgSglPU880GOfw5SORF2GKS',
  token: '4iDuAafoB20ueevxoEEHZFHcFdHexte7F6SkB31xM1yA2faXfM',
  token_secret: 'Ry6o0dVM67diM2mptX1tmh8j31BTbBp7BSoJbfN0O76Pm4ZlvP'
};

const oauth = OAuth({
  consumer: {
    key: DUMMY_CREDENTIALS.consumer_key,
    secret: DUMMY_CREDENTIALS.consumer_secret
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  }
});

const getOAuthHeader = (url) => {
  const request_data = {
    url,
    method: 'GET'
  };

  const token = {
    key: DUMMY_CREDENTIALS.token,
    secret: DUMMY_CREDENTIALS.token_secret
  };

  return oauth.toHeader(oauth.authorize(request_data, token));
};

const fetchTumblrPosts = async (blogName, tag = '') => {
  const url = `https://api.tumblr.com/v2/blog/${blogName}/posts/photo?api_key=${DUMMY_CREDENTIALS.consumer_key}&tag=${tag}`;
  try {
    const headers = getOAuthHeader(url);
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.response.posts;
  } catch (error) {
    console.error('Error fetching Tumblr posts:', error);
    return [];
  }
};

export default fetchTumblrPosts;