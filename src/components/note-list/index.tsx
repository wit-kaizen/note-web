import React, { useState, useEffect } from 'react';

import './index.css';
import NoteItem from '../note-item';
import NoteDao from '../../database/note';
import Note from '../../model/note';

function NoteList() {
  const [ noteList, setNoteList ] = useState<Note[]>([]);

  const handleNoteDeleted = (id: number) => {
    const index = noteList.findIndex(d => d.id === id);
    noteList.splice(index, 1)
    setNoteList([...noteList])
  }

  useEffect(() => {
    NoteDao.getAll((noteList: Note[]) => {
      setNoteList(noteList);
    });

    window.mb.listen('noteAdded', (note: Note) => {
      setNoteList((prevList)=>[note, ...prevList])
    });
  }, [])
  return (
    <div className="note-list">
      { noteList.map(d => (<NoteItem handleNoteDeleted={handleNoteDeleted} data={d} key={d.createAt.toString()} />)) }
    </div>
  )
}

export default NoteList;