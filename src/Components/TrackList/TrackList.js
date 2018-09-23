import React from 'react';
import ReactDOM from 'react-dom';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {
//Pass every track in the Track component mapping the tracks array (to render a TrackList)
  render() {
    return(
      <div className="TrackList">
        {this.props.tracks.map(currentTrack =>{
          if (currentTrack == undefined){return;}
          return <Track track={currentTrack} key={currentTrack.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />;
        })}
      </div>
    );
  }
}

export default TrackList;
