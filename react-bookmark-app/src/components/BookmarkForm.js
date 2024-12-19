import React from "react";
import "./BookmarkForm.css";

function BookmarkForm({
  selectedId, newBookmark, setNewBookmark, onCreate, onUpdate,
}) {
  return (
    <div className="bookmark-form">
      <h2>{selectedId ? "Update Bookmark" : "Add a Bookmark"}</h2>
      <input type="text" placeholder="Title" value={newBookmark.title} onChange={(e) =>
          setNewBookmark({ ...newBookmark, title: e.target.value })} className="form-input"/>
      <input type="text" placeholder="URL" value={newBookmark.url} onChange={(e) => setNewBookmark(
        { ...newBookmark, url: e.target.value }) } className="form-input"/>
      <button onClick={selectedId ? onUpdate : onCreate} className="submit-button"> {selectedId ? "Update" : "Create"} </button>
    </div>
  );
}

export default BookmarkForm;
