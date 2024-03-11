import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    if (hasMore) {
      fetchPosts();
    }
  }, [page, hasMore]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "grey" }}>
      <h1 className="text-center mb-5">MelodyVerse</h1>
      <div className="row">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="col-md-4 mb-4"
            style={{
              backdropFilter: "",
              border: " 2px solid rgba(255,255,255,0.1)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <i className="fa-regular fa-star" style={{ marginRight: "1em", cursor: "pointer" }}></i>
                <i className="fa-solid fa-comment" style={{ marginRight: "1em", cursor: "pointer" }}></i>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {loading && <p className="text-center my-4">Loading...</p>}
      {!loading && !hasMore && (
        <p className="text-center my-4">No more posts to load.</p>
      )}
    </div>
  );
};

export default HomePage;
