import React from 'react';
import ReactDOM from 'react-dom';

import CallDetails from './CallDetails.jsx';

class CallListView extends React.Component {
  render() {
    const calls = [];
    this.props.data && this.props.data.forEach((call, i) =>
      calls.push(
        <CallDetails
          key={'CallRow' + i}
          data={call}
          onClick={this.props.onClick}
          verbose={false}
        />
      )
    );

    return (
      <div>
        {calls}
      </div>
    );
  }
}

export default CallListView;
