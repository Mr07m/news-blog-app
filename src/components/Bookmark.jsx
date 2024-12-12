import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./Modal.css";
import userImg from "../assets/images/user.jpg";
import { AiFillDelete } from "react-icons/ai";
import "./Bookmark.css";

const Bookmark = ({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmarks,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <RxCross2 />
        </span>
        <h2 className="bookmark-heading">Bookmarked News</h2>
        <div className="bookmark-list">
          {bookmarks.map((article, index) => (
            <div className="bookmark-item" key={index}>
              <img src={article.image || noImg} alt={article.title} />
              <h5>{article.title}</h5>
              <span
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation;
                  onDeleteBookmarks(article);
                }}
              >
                <AiFillDelete />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
