import React from 'react';

import './index.css';

import Note from '../../model/note';
import NoteDao from '../../database/note';

const CHAR_ENTER_KEYCODE = 13;

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      textRef: null,
    }
    this.handleNoteSave = this.handleNoteSave.bind(this);
    this.listenKeyboard = this.listenKeyboard.bind(this);

    this.listenKeyboard();
  }

  listenKeyboard() {
    document.addEventListener('keydown', (e) => {
      // 聚焦在textarae上，并且按cmd+enter，有非空内容才提交
      if (
        e.target === this.state.textRef
        && e.metaKey
        && e.keyCode === CHAR_ENTER_KEYCODE
        && this.state.input && this.state.input.trim()
      ) {
        this.handleNoteSave();
      }
    });
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleNoteSave() {
    if (this.state.input && this.state.input.trim()) {
      const item = Note.createFromText(this.state.input);

      NoteDao.add(item, (id) => {
        Object.assign(item, { id });
        this.setState({
          input: '',
        }, this.props.handleNoteAdded(item));
      });
    }
  }

  render() {
    let { input } = this.state;
    return (
      <div className="editor">
        <textarea
          ref={(input) => { this.state.textRef = input; }}
          value={input}
          placeholder="请输入内容…"
          onChange={(e) => { this.handleInputChange(e) }} />

        {/* TODO 无内容 设置disable的样式 */}
        <div className="btn-row">
          {
            input && input.trim() ?
            <button onClick={ () => { this.handleNoteSave(); } }> 就这样 </button>
            :
            <button disabled> 就这样 </button>
          }
          <span>按 ⌘ Enter 发送</span>
        </div>
      </div>
    )
  }
}

export default Editor;