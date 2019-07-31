import React from 'react';
import ReactDOM from 'react-dom';

import callAnsweredIcon from './assets/call_answered.png';
import callMissedIcon from './assets/call_missed.png';
import callVoicemailIcon from './assets/call_voicemail.png';

const SECS_IN_MIN = 60;
const SECS_IN_HOUR = 60 * 60;

class CallDetails extends React.Component {
  render() {
    const data = this.props.data;
    if (data.is_archived) {
      return null;
    }

    const date = new Date(data.created_at);
    const datestamp = date.toDateString();
    const timestamp = date.toLocaleTimeString();

    let actionFragment;
    if (data.direction === 'inbound') {
      actionFragment = data.to
        ? (this.getActionFragment(data.call_type) + data.to)
        : '';
    } else {
      actionFragment = data.from ? ('called by ' + data.from) : '';
    }

    let via;
    if (this.props.verbose && data.via) {
      via = (
        <div>
          {'via ' + data.via}
        </div>
      )
    }

    let duration;
    if (this.props.verbose && data.duration) {
      const hours = Math.floor(data.duration / SECS_IN_HOUR);
      const minutes = Math.floor(
        data.duration % SECS_IN_HOUR / SECS_IN_MIN
      ).toLocaleString('fr-FR', {minimumIntegerDigits: 2});
      const seconds = (data.duration % SECS_IN_MIN).toLocaleString(
        'fr-FR',
        {minimumIntegerDigits: 2},
      );
      duration = (
        <div>
          {(hours > 0 ? (hours + ':') : '') + minutes + ':' + seconds}
        </div>
      );
    }

    return (
      <div
        className='call-row'
        onClick={this.props.onClick && this.props.onClick.bind(this, data.id)}>
        <div className='call-row-heading'>
          {datestamp}
        </div>
        <div className='call-row-container'>
          <img
            className='icon'
            src={this.getIcon(data.call_type)}
          />
          <div className='party-info'>
            <div className='other-party-info'>
              {data.direction === 'inbound' ? data.from : data.to}
            </div>
            <div>
              {actionFragment}
            </div>
            {via}
            {duration}
          </div>
          <div>{timestamp}</div>
        </div>
      </div>
    );
  }

  getActionFragment(type) {
    switch (type) {
      case 'missed':
        return 'tried to call on ';
      case 'voicemail':
        return 'left a voicemail to ';
      case 'answered':
        return 'answered by ';
    }
    return '';
  }

  getIcon(type) {
    switch (type) {
      case 'missed':
        return callMissedIcon;
      case 'voicemail':
        return callVoicemailIcon;
      case 'answered':
      default:
        return callAnsweredIcon;
    }
  }
}

export default CallDetails;
