import React from 'react';

import './index.css';

import NoteItem from '../note-item';
class NoteList extends React.Component {
  render () {
    return (
      <div className="note-list">
        { this.props.datas.map(d => (<NoteItem handleNoteDeleted={this.props.handleNoteDeleted} data={d} key={d.createAt} />)) }
      </div>
    );
  }
}

export default NoteList;