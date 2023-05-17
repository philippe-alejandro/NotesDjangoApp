import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NotesListPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  let [notes, setNotes] = useState([]);

  useEffect(() => {
      getNotes();
  }, [])

  let getNotes = async () => {
    console.log("getNotes()");
    let response = await fetch('/api/notes/');
    let data = await response.json();
    const isAuthenticated = data.authenticated;
    setAuthenticated(isAuthenticated);
    setNotes(data);
    console.log(notes);
  }

  useEffect(() => {
    if (!authenticated) {
      navigate('/login'); // Redirect to the login page if not authenticated
    }
  }, [authenticated, navigate]);

  return (
      <div className="notes">
        <div className="notes-header">
          <h2 className="notes-title">&#9782; Notes</h2>
          <p className="notes-count">{notes.length}</p>
        </div>

        <div className="notes-list">
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <ListItem key={index} note={note} />
            ))
          ) : (
            <p>Loading notes...</p>
          )}
        </div>
          <AddButton />
      </div>
  )
}

export default NotesListPage;