import AppHeader from './components/header';
import AppBody from './components/body';
import AppSider from './components/sider';
import AppEditor from './components/editor';
import AppNoteList from './components/note-list';
import EventEmitter from './utils/message-bus';

import './App.css';

if (!window.mb) {
  window.mb = new EventEmitter();
}

function App () {
  return (
    <div className="app">
      <AppSider/>
      <AppBody>
        <AppHeader/>
        <main>
          <AppEditor/>
          <AppNoteList />
        </main>
      </AppBody>
    </div>
  );
}

export default App;