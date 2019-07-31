import React from 'react';
import ReactDOM from 'react-dom';

import CallDetails from './CallDetails.jsx';

class CallDetailsView extends React.Component {
  render() {
    return (
      <div>
        <CallDetails data={this.props.data} verbose={true} />
        <div className='button-container'>
          <div className='button' onClick={this.props.onBack}>Back</div>
          <div className='button' onClick={this.props.onArchive}>Archive</div>
        </div>
      </div>
    );
  }
}

export default CallDetailsView;
