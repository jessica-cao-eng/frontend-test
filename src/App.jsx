import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CallDetailsView from './CallDetailsView.jsx';
import CallListView from './CallListView.jsx';
import Header from './Header.jsx';

const API = 'https://aircall-job.herokuapp.com/activities';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      callData: null,
      data: [],
      error: null,
    };

    this.fetchCalls = this.fetchCalls.bind(this);
  }

  componentDidMount() {
    this.fetchCalls();
  }

  render() {
    let view;
    if (this.state.error) {
      view = this.state.error.toString();
    } else if (this.state.callData) {
      view = (
        <CallDetailsView
          data={this.state.callData}
          onArchive={this.archive.bind(this)}
          onBack={this.closeCallDetails.bind(this)}
        />
      );
    } else if (this.state.data) {
      view = (
        <CallListView
          data={this.state.data}
          onClick={this.openCallDetails.bind(this)}
        />
      );
    } else {
      view = 'Something has gone wrong.';
    }

    return (
      <div className='container'>
        <Header/>
        <div className="container-view">
          {view}
        </div>
      </div>
    );
  }

  archive() {
    axios.post(API + '/' + this.state.callData.id, {is_archived: true})
      .then(res => this.fetchCalls())
      .catch(error => this.setState({error}));
  }

  openCallDetails(id) {
    axios.get(API + '/' + id)
      .then(res => this.setState({callData: res.data}))
      .catch(error => this.setState({error}));
  }

  closeCallDetails() {
    this.setState({callData: null});
  }

  fetchCalls() {
    axios.get(API)
      .then(res => this.setState({
        callData: null,
        data: res.data,
        error: null,
      }))
      .catch(error => this.setState({error}));
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
