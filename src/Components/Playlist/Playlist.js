import React from 'react';
import TrackList from '../TrackList/TrackList.js'
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
//Event handler which will change the stat of the name of the playlist when the target input value changes
  handleNameChange(e){
    const name = e.target.value;
    this.props.onNameChange(name);
  }

  render () {
    return(
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
        {/*Added Spotify Library button with href*/}
        <a className="button" href="https://open.spotify.com/collection/playlists" target="_blank" >Spotify Library</a>
      </div>
    );
  }
}

export default Playlist;
