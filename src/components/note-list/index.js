import './index.css';

import NoteItem from '../note-item';

function NoteList (props) {
  return (
    <div className="note-list">
      { props.datas.map(d => (<NoteItem handleNoteDeleted={props.handleNoteDeleted} data={d} key={d.createAt} />)) }
    </div>
  );
}

export default NoteList;