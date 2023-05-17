import React, { useState, useEffect } from 'react';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { useParams, useNavigate } from 'react-router-dom';

const NotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);

    useEffect(() => {
        console.log("getNote()");
        getNote();
    }, [id]);

    const getNote = async () => {
      console.log("executing getNote()");
      if (id === 'new') return;

      const response = await fetch(`/api/notes/${id}/`);
      const data = await response.json();
      setNote(data);
    };

    const createNote = async () => {
      console.log("createNote fetch");
      fetch(`/api/notes/`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
      });
      navigate('/notes');
    };

    const updateNote = async () => {
      console.log("updateNote fetch");
      const response = await fetch(`/api/notes/${id}/`, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
      });
      const data = await response.json();
      navigate('/notes');
      console.log('updateNode data', data); // Log the response data
    };

    const deleteNote = async () => {
      fetch(`/api/notes/${id}/`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      navigate('/notes');
    };

    const handleSubmit = () => {
        if (id !== 'new' && note.body === '') {
          console.log('NOTE:', 'deleteNote()', note.body);
          deleteNote();
        } else if (id !== 'new') {
          console.log('NOTE:', 'updateNote()', note.body);
          updateNote();
        } else if (id === 'new' && note.body !== null) {
          console.log('NOTE:', 'createNote()', note.body);
          createNote();
        }
        navigate('/notes');
    };

    const handleChange = (value) => {
        setNote(prevNote => ({ ...prevNote, 'body': value }));
        console.log('Handle Change:', note);
    };

    return (
        <div className="note" >
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    );
};

export default NotePage;
