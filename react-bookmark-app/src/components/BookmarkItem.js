import React from "react";
import "./BookmarkItem.css";

function BookmarkItem({ bookmark, onEdit, onDelete }) {
  return (
    <li className="bookmark-item">
      <a href={bookmark.URL} target="_blank" rel="noopener noreferrer" className="bookmark-link" > {bookmark.title} </a>
      <div className="button-container">
        <button className="edit-button" onClick={() => onEdit(bookmark.id)}> Edit </button>
        <button className="delete-button" onClick={() => onDelete(bookmark.id)}> Delete </button>
      </div>
    </li>
  );
}

export default BookmarkItem;
