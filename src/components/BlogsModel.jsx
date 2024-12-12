import React from "react";
import noImg from "../assets/images/no-img.png";
import { RiCloseLargeLine } from "react-icons/ri";
import "./BlogsModal.css";

const BlogsModel = ({ show, blog, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <RiCloseLargeLine />
        </span>
        {blog.image && (
          <img
            className="blogs-modal-image"
            src={blog.image || noImg}
            alt={blog.title}
          />
        )}

        <h2 className="blogs-modal-title">{blog.title}</h2>
        <p className="blogs-post-content">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogsModel;