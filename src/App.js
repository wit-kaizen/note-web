import React from 'react';
import NoteDao from './database/note';

import AppHeader from './components/header';
import AppBody from './components/body';
import AppSider from './components/sider';
import AppMainEditor from './components/editor';
import AppMainNoteList from './components/note-list';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      noteList: [],
    }
  }

  componentDidMount() {
    NoteDao.getAll((noteList) => { this.setState({ loading: false, noteList }) });
  }

  handleNoteAdded(note) {
    this.setState({
      noteList: [note, ...this.state.noteList],
    });
  }

  handleNoteDeleted(deletedId) {
    this.setState({
      noteList: this.state.noteList.filter(d => d.id !== deletedId),
    });
  }

  render () {
    const { noteList } = this.state;

    return (
      <div className="app">
        <AppSider/>
        <AppBody>
          <AppHeader/>
          <div className="app-body__main">
            <AppMainEditor handleNoteAdded={(note) => { this.handleNoteAdded(note) }}/>
            <AppMainNoteList datas={noteList} handleNoteDeleted={(id) => { this.handleNoteDeleted(id) }} />
          </div>
        </AppBody>
      </div>
    );
  }
}

export default App;