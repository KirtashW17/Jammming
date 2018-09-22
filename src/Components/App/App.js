//Import all files needed requiered by App.js and his stylesheet.
import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
import './App.css';

//Creating App Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults :[],
      playlistName : 'New Playlist',
      playlistTracks : this.getSavedValue('playlists')
    }
    this.getSavedValue = this.getSavedValue.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  //addTrack method will add a track to the playlist


  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
    let newPlaylist = this.state.playlistTracks.slice();
    newPlaylist.push(track);
    this.setState({playlistTracks : newPlaylist});
    sessionStorage.setItem('playlists',JSON.stringify(newPlaylist));
    console.log(JSON.stringify(sessionStorage.getItem('playlists')));
    }
  }
  getSavedValue(v){
    if (sessionStorage.getItem(v) === null) {
      return [];
    }
    else if (sessionStorage.getItem(v) !== undefined){
      return JSON.parse(sessionStorage.getItem(v));
    }
  }
  //removeTrack will remove a track from the playlist
  removeTrack(track){
    let trackToFind = this.state.playlistTracks.find(savedTrack => savedTrack.id==track.id);
    let trackIndex = this.state.playlistTracks.findIndex(savedTrack => savedTrack==track);
    let newPlaylist = this.state.playlistTracks.slice();
    newPlaylist.splice(trackIndex,1);
    this.setState({playlistTracks : newPlaylist});
  }
  //This method will change the playlist name
  updatePlaylistName(name){
    this.setState({playlistName : name});
  }
  //Saves a playlist to the user account (see Spotify.js) ; make anarray of trackUris to pass on savePlaylist reset the state of the playlist
  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }
  //Search a track using spotify api (see Spotify.js)
  search(term){
    if(term==''){
      return;
    }
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }
  //This is what this component will render, information from App state is passed to other components
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>

        <div className="App">
          <SearchBar onSearch={this.search} searchResults={this.state.searchResults} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
