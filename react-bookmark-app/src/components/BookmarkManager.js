import React, { useEffect, useState } from "react";
import BookmarkItem from "./BookmarkItem";
import BookmarkForm from "./BookmarkForm";
import "./BookmarkManager.css";

function BookmarkManager() {
  const [bookmarks, setBookmarks] = useState([]);
  const [newBookmark, setNewBookmark] = useState({ title: "", url: "" });
  const [selectedId, setSelectedId] = useState(null);
  const apiBaseUrl = "http://localhost:3000/api";

  const fetchBookmarks = () => {
    fetch(`${apiBaseUrl}/readAll.php`)
      .then((response) => response.json())
      .then((data) => setBookmarks(data))
  };

  useEffect(() => {fetchBookmarks();}, []);

  const handleCreate = () => {
    if (!newBookmark.title || !newBookmark.url) {
      alert("Please enter both Title and URL.");
      return;
    }

    fetch(`${apiBaseUrl}/create.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBookmark),
    }).then((response) => response.json())
      .then(() => {
        fetchBookmarks();
        setNewBookmark({ title: "", url: "" });
      })
  };

  const handleDelete = (id) => {
    fetch(`${apiBaseUrl}/delete.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(() => fetchBookmarks())
  };

  const handleReadOne = (id) => {
    fetch(`${apiBaseUrl}/readOne.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedId(data.id);
        setNewBookmark({ title: data.title, url: data.URL });
      })
  };
  const handleUpdate = () => {
    fetch(`${apiBaseUrl}/update.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedId, ...newBookmark }),
    }).then(() => {fetchBookmarks(); setSelectedId(null); setNewBookmark({ title: "", url: "" }); });
  };

  return (
    <div className="bookmark-manager">
      <h1 className="bookmark-title">My Bookmarks</h1>
      <ul className="bookmark-list">
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} onEdit={handleReadOne} onDelete={handleDelete} /> ))}
      </ul>
      <BookmarkForm selectedId={selectedId} newBookmark={newBookmark} setNewBookmark={setNewBookmark} onCreate={handleCreate} onUpdate={handleUpdate}/>
    </div>
  );
}

export default BookmarkManager;
