import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : [/*{
        name: 'De Trankis',
        artist: 'LDS',
        album: 'Viridarquía',
        id:'001'
      },{
        name: 'De Trankis',
        artist: 'LDS',
        album: 'Viridarquía',
        id:'002'
      },{
        name: 'De Trankis',
        artist: 'LDS',
        album: 'Viridarquía',
        id:'003'
      },{
        name: 'De Trankis',
        artist: 'LDS',
        album: 'Viridarquía',
        id:'004'
      },{
        name: 'De Trankis',
        artist: 'LDS',
        album: 'Viridarquía',
        id:'005'
      }*/],
      playlistName : 'New Playlist',
      playlistTracks : [/*{
        name: 'Guapo Tarde',
        artist: 'Kase-O',
        album: 'El Circulo',
        id : '006'
      },{
        name:'La Perla',
        artist:'Calle 13',
        album: 'Unknown',
        id:'007'
      },{
        name:'Sin Miedo a Vivir',
        artist:'SFDK',
        album:'Sin Miedo a Vivir',
        id:'008'
      }*/]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
    let newPlaylist = this.state.playlistTracks.slice();
    newPlaylist.push(track);
    this.setState({playlistTracks : newPlaylist});
    }
  }
  removeTrack(track){
    let trackToFind = this.state.playlistTracks.find(savedTrack => savedTrack.id==track.id);
    let trackIndex = this.state.playlistTracks.findIndex(savedTrack => savedTrack==track);
    let newPlaylist = this.state.playlistTracks.slice();
    newPlaylist.splice(trackIndex,1);
    this.setState({playlistTracks : newPlaylist});
  }
  updatePlaylistName(name){
    this.setState({playlistName : name});
  }
  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }
  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
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
