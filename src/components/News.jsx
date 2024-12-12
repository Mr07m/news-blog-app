import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import { BsSearch } from "react-icons/bs";
import userImg from "../assets/images/logo.png";
import noImg from "../assets/images/no-img.png";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import NewsModel from "./NewsModel";
import Bookmark from "./Bookmark";
import { BsBookmarkFill } from "react-icons/bs";
import BlogsModel from "./BlogsModel";

const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);

  // const API = "8f70e89ff25a7dc29aade9b8448ebdce"; //developermahi
  // const API = "92eba6fe2609e99f1362ef150f796d63"; //co23
  // const API = "9c263d140982bcd64e85a107e9ee0bea"; // co21
  const API =  "c7b038b9e4ab818cbdfa09e51de46d81"; // mahirrathod

  const categories = [
    "general",
    "world",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
    "nation",
  ];
  const [selectedCategories, setSelectedCategories] = useState("general");

  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategories}&lang=en&apikey=${API}`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=${API}`;
      }
      const res = await axios.get(url);
      const newsData = res.data.articles;
      newsData.forEach((article) => {
        if (!article.image) {
          article.image.noImg;
        }
      });
      setNews(newsData.slice(1, 7));
      setHeadline(newsData[0]);
      const savedBookmark = JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarks(savedBookmark);
    };
    fetchNews();
  }, [selectedCategories, searchQuery]);

  const handleCategoriesClick = (e, category) => {
    e.preventDefault();
    setSelectedCategories(category);
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchInput();
    }
  };

  const handleBlogClick = (blog) => {
    setSelectedPost(blog);
    setShowBlogModal(true);
  };
  const closeBlogModal = () => {
    setShowBlogModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearchInput}>
            <input
              type="text"
              placeholder="Search News..."
              name=""
              id=""
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit">
              <BsSearch />
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="" />
            <p>Mahi's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => {
                return (
                  <a
                    href="#"
                    key={category}
                    className="nav-link"
                    onClick={(e) => handleCategoriesClick(e, category)}
                  >
                    {category}
                  </a>
                );
              })}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarkModal(true)}
              >
                Bookmarks <BsBookmarkFill />
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div
              className="headline"
              onClick={() => handleArticleClick(headline)}
            >
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <span
                  className="bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                >
                  {bookmarks.some(
                    (bookmark) => bookmark.title === headline.title
                  ) ? (
                    <BsBookmarkFill />
                  ) : (
                    <FaRegBookmark />
                  )}
                </span>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => {
              return (
                <div
                  className="news-grid-item"
                  key={index}
                  onClick={() => handleArticleClick(article)}
                >
                  <img src={article.image || noImg} alt={article.title} />
                  <h5>
                    {article.title}
                    <span
                      className="bookmark"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(article);
                      }}
                    >
                      {bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      ) ? (
                        <BsBookmarkFill />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </span>
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
        <NewsModel
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        <Bookmark
          show={showBookmarkModal}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarkModal(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmarks={handleBookmarkClick}
        />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="blog-post"
                onClick={() => handleBlogClick(blog)}
              >
                <img src={blog.image || noImg} alt={blog.title} />
                <h3>{blog.title}</h3>

                <div className="post-buttons">
                  <button
                    className="edit-post"
                    onClick={() => onEditBlog(blog)}
                  >
                    <MdEditSquare />
                  </button>
                  <button
                    className="delete-post"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBlog(blog);
                    }}
                  >
                    <RiDeleteBin2Line />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedPost && showBlogModal && (
            <BlogsModel
              show={showBlogModal}
              blog={selectedPost}
              onClose={closeBlogModal}
            />
          )}
        </div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">
        <p>
          <span>News & Blogs App</span>
        </p>
        <p>&copy; All Right Reserved. By Mahi Rathod</p>
      </footer>
    </div>
  );
};

export default News;
