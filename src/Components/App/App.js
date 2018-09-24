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
      playlistName : this.getPlaylistName(),
      playlistTracks : this.getSavedValue('playlists')
    }
    this.getPlaylistName = this.getPlaylistName.bind(this);
    this.getSavedValue = this.getSavedValue.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //get a playlist name
  getPlaylistName(){
    const playlistName=sessionStorage.getItem('playlistName');
    if (playlistName===null){
      return 'New Playlist';
    }
    return playlistName;
  }
  //get playlist tracks
  getSavedValue(v){
    if (sessionStorage.getItem(v) === null||sessionStorage.getItem(v)=== undefined ||sessionStorage.getItem(v).length===0) {
      return [];
    }
    else if (sessionStorage.getItem(v) !== undefined){
      return JSON.parse(sessionStorage.getItem(v));
    }
  }
  saveValue(name,value){
    sessionStorage.setItem(name,value);
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
    }
  }



  //removeTrack will remove a track from the playlist
  removeTrack(track){
    let trackToFind = this.state.playlistTracks.find(savedTrack => savedTrack.id==track.id);
    let trackIndex = this.state.playlistTracks.findIndex(savedTrack => savedTrack==track);
    let newPlaylist = this.state.playlistTracks.slice();
    newPlaylist.splice(trackIndex,1);
    this.setState({playlistTracks : newPlaylist});
    this.saveValue('playlists',JSON.stringify(newPlaylist));
  }
  //This method will change the playlist name
  updatePlaylistName(name,playlistTracks){
    this.setState({playlistName : name});
    this.saveValue('playlistName',name);

  }
  //Saves a playlist to the user account (see Spotify.js) ; make anarray of trackUris to pass on savePlaylist reset the state of the playlist
  savePlaylist(){
    if (this.state.playlistName==null || this.state.playlistTracks==null){
      console.log('ERROR: Playlist tracks or name cannot be empty!')
      return;
    }
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
      this.saveValue('playlistName','New Playlist');
      this.saveValue('playlists',JSON.stringify(this.state.playlistTracks));
      //reload the page to re-set the playlist name to New Playlist (the state is New playlist but playlist.js has not updated the input)
      window.location.reload();

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
          <div className="App-playlist" >
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onGetPlaylist={this.getPlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}
window.onload = Spotify.getAccessToken;
export default App;
