import AppHeader from './components/header';
import AppBody from './components/body';
import AppSider from './components/sider';
import AppEditor from './components/editor';
import AppNoteList from './components/note-list';

import './utils/message-bus';
import './App.css';

function App () {
  return (
    <div className="app">
      <AppSider/>
      <AppBody>
        <AppHeader/>
        <main>
          <AppEditor handleNoteAdded={(note) => { this.handleNoteAdded(note) }}/>
          <AppNoteList />
        </main>
      </AppBody>
    </div>
  );
}

export default App;