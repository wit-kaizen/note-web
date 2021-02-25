import React from 'react';

import './index.css';
import NoteItem from '../note-item';
import NoteDao from '../../database/note';

class NoteList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      noteList: [],
    }
    this.handleNoteDeleted = this.handleNoteDeleted.bind(this);
  }

  componentDidMount() {
    NoteDao.getAll((noteList) => { this.setState({ loading: false, noteList }) });

    window.mb.addListener('noteAdded', note => {
      this.setState({
        noteList: [note, ...this.state.noteList],
      });
    });
  }

  handleNoteDeleted(deletedId) {
    this.setState({
      noteList: this.state.noteList.filter(d => d.id !== deletedId),
    });
  }

  render () {
    return (
      <div className="note-list">
        { this.state.noteList.map(d => (<NoteItem handleNoteDeleted={this.handleNoteDeleted} data={d} key={d.createAt} />)) }
      </div>
    );
  }
}


export default NoteList;