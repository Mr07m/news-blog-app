import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./NewsModel.css";
import "./Modal.css";


const NewsModel = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <RxCross2 />
        </span>
        {article && (
          <>
            <img
              src={article.image}
              alt={article.title}
              className="modal-image"
            />
            <h2 className="modal-title">{article.title}</h2>
            <p className="modal-source">Source: {article.source.name}</p>
            <p className="modal-date">
              {new Date(article.publishedAt).toLocaleString("en-IN", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kolkata",
              })}
              ;
            </p>
            <p className="modal-content-text">{article.content}</p>
            <a
              href={article.url}
              className="read-more-link"
              target="_blank"
              rel="noopener noreferre"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModel;
