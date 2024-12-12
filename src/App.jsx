import React, { useEffect, useState } from "react";
import News from "./components/News";
import Blogs from "./components/Blogs";

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  }, []);

  const handleCreateBlog = (newBlogs, isEditing) => {
    setBlogs((prevBlogs) => {
      const updateBlogs = isEditing
        ? prevBlogs.map((blog) => (blog === selectedPost ? newBlogs : blog))
        : [...prevBlogs, newBlogs];
      localStorage.setItem("blogs", JSON.stringify(updateBlogs));
      return updateBlogs;
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleEditBlog = (blog) => {
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlog(true);
  };

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlog(true);
  };
  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlog(false);
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlog) => {
      const updateBlogs = prevBlog.filter((blog) => blog !== blogToDelete);
      localStorage.setItem("blogs", JSON.stringify(updateBlogs));
      return updateBlogs;
    });
  };
  return (
    <div className="container">
      <div className="news-blog-app">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            onDeleteBlog={handleDeleteBlog}
          />
        )}
        {showBlog && (
          <Blogs
            editPost={selectedPost}
            isEditing={isEditing}
            onBack={handleBackToNews}
            onCreateBlog={handleCreateBlog}
          />
        )}
      </div>
    </div>
  );
};

export default App;
