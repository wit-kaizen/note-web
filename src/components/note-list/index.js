import React, { useState, useEffect } from 'react';

import './index.css';
import NoteItem from '../note-item';
import NoteDao from '../../database/note';

function NoteList() {
  const [ noteList, setNoteList ] = useState([]);

  const handleNoteDeleted = (note) => {
    setNoteList([note, ...noteList])
  }

  useEffect(() => {
    NoteDao.getAll((noteList) => {
      setNoteList(noteList);
    });

    window.mb.addListener('noteAdded', (note) => {
      setNoteList((prevList)=>[note, ...prevList])
    });
  }, [])

  return (
    <div className="note-list">
      { noteList.map(d => (<NoteItem handleNoteDeleted={handleNoteDeleted} data={d} key={d.createAt} />)) }
    </div>
  )
}

export default NoteList;