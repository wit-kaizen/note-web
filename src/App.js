import AppHeader from './components/header';
import AppBody from './components/body';
import AppSider from './components/sider';
import AppMainEditor from './components/editor';
import AppMainNoteList from './components/note-list';
import './utils/message-bus';

import './App.css';

function App () {
  return (
    <div className="app">
      <AppSider/>
      <AppBody>
        <AppHeader/>
        <div className="app-body__main">
          <AppMainEditor handleNoteAdded={(note) => { this.handleNoteAdded(note) }}/>
          <AppMainNoteList />
        </div>
      </AppBody>
    </div>
  );
}

export default App;