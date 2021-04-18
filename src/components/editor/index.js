import React, { useState, useCallback, useRef, useEffect } from 'react';

import './index.css';

import Note from '../../model/note';
import NoteDao from '../../database/note';

const CHAR_ENTER_KEYCODE = 13;

function Editor() {
  const [input, setInput] = useState('');
  const textRef = useRef();

  const handleInputChange = (e) =>  {
    setInput( e.target.value);
  }

  const handleNoteSave = (input) => {
    const item = Note.createFromText(input);
    NoteDao.add(item, (id) => {
      Object.assign(item, { id });
      setInput('');
      window.mb.emit('noteAdded', item);
    });
  }

  const handleNoteSaveShortcut = useCallback(e => {
    // 聚焦在textarae上，并且按cmd+enter，有非空内容才提交
    if (
      e.target === textRef.current
      && e.metaKey
      && e.keyCode === CHAR_ENTER_KEYCODE
      && input && input.trim()
    ) {
      handleNoteSave(input);
    }
  }, [input])


  useEffect(() => {
    document.addEventListener('keydown', handleNoteSaveShortcut);
    return () => {
      document.removeEventListener('keydown', handleNoteSaveShortcut);
    }
  }, [handleNoteSaveShortcut])

  return (
    <div className="editor">
      <textarea
        ref={textRef}
        value={input}
        placeholder="请输入内容…"
        onChange={handleInputChange} />

      {/* TODO 无内容 设置disable的样式 */}
      <div className="btn-row">
        {
          input && input.trim() ?
          <button onClick={ () => { handleNoteSave(); } }> 就这样 </button>
          :
          <button disabled> 就这样 </button>
        }
        <span>按 ⌘ Enter 发送</span>
      </div>
    </div>
  );
}

export default Editor;