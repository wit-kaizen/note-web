import React from 'react';

import './index.css';

import utils from '../../utils';
import NoteDao from '../../database/note';

function delNote(note, handler) {
  const id = note.id;
  NoteDao.delete(id, handler(id))
}

function  generateContent(str) {
  const reg = /(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?/g;
  const res = [];
  let match;
  let pos = 0;
  let index = 0;

  while(!!(match = reg.exec(str))) {
    let url = match[0];
    let index = match.index;
    if(index > pos) {
      res.push(<span key={index++}>{str.substring(pos, index)}</span>)
    }
    res.push(<a key={index++} target="_blank" rel="noreferrer" href={url}>{url}</a>)
    pos = index + url.length;
  }
  if(pos<str.length) res.push(<span key={index++}>{str.substring(pos, str.length)}</span>);
  return res
}

function NoteItem(props) {
    // TODO
    // 1. 为什么hover会导致日期都移动
    // 2. 解决删除后的震动问题
    const { data:d, handleNoteDeleted } = props;
    return (
      <div className="note-item" key={d.createAt}>
        <p className="desc-row">
          <span className="create-date">创建于 {utils.formatDate(Number(d.createAt))}</span>
          <span className="operation">
            <span href="#" className="btn del" onClick={() => { delNote(d, handleNoteDeleted)} }>❌ </span>
          </span>
        </p>
        <p className={d.done ? 'content-row deleted' : 'content-row'}>
          {d.category && d.category[0] === 'n/a' ? '' : <span className="tag">{d.category}</span>}
          {generateContent(d.content)}
        </p>
      </div>
    );
}

export default NoteItem;