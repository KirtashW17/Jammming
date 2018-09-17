import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : [{
        name: 'De Trankis',
        artist: 'LDS',
        album: 'Viridarquía',
        id:'001'
      },{
        name: 'De Trankis',
        artist: 'LDS',
        album: 'Viridarquía',
        id:'001'
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
      }],
      playlistName : 'New Playlist',
      playlistTracks : [{
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
      },]
    }
  }
  addTrack(track) #
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
