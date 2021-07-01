import React, { useState, useEffect } from 'react';

import './index.css';
import NoteItem from '../note-item';
import NoteDao from '../../database/note';

function NoteList() {
  const [ noteList, setNoteList ] = useState([]);

  const handleNoteDeleted = (id) => {
    const index = noteList.findIndex(d => d.id === id);
    noteList.splice(index, 1)
    setNoteList([...noteList])
  }

  useEffect(() => {
    NoteDao.getAll((noteList) => {
      setNoteList(noteList);
    });

    window.mb.addListener('noteAdded', (note) => {
      setNoteList((prevList)=>[note, ...prevList])
    });
  }, [])
  let hash = {}
  noteList.forEach(d => {
    hash[d.createAt] = hash[d.createAt] !== undefined ? true : false;
  });
  console.log(hash);
  return (
    <div className="note-list">
      { noteList.map(d => (<NoteItem handleNoteDeleted={handleNoteDeleted} data={d} key={d.createAt.toString()} />)) }
    </div>
  )
}

export default NoteList;