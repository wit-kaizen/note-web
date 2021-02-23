import React from 'react';

import './index.css';

class AppBody extends React.Component {
  render () {
    return (
      <div className="app-body">
        {this.props.children}
      </div>
    );
  }
}

export default AppBody;