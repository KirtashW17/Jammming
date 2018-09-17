import React from 'react';
import ReactDOM from 'react-dom';
import Track from '../Track/Track.js';

class TrackList extends React.Component {


  render() {
    return(
      <div className="TrackList">
        {this.props.tracks.map(function(currentTrack){
          <Track track={currentTrack} key={currentTrack.id} />
        })}
      </div>
    );
  }
}

export default TrackList;
