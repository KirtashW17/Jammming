import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './SearchResults.css';
import Spotify from '../../util/Spotify.js';


class SearchResults extends React.Component {
  constructor(props){
    super(props);
    this.searchFilter=this.searchFilter.bind(this);
  }


  //FEATURE:eliminate tracks that already are in the playlist.
  searchFilter(searchResults){
    let tracks = [];
    this.props.searchResults.map(currentTrack =>{
      //if (currentTrack == undefined){return;}
      if (Spotify.getSavedValue('playlists').find(savedTrack => savedTrack.id === currentTrack.id)){return;}
      tracks.push(currentTrack);
      //return tracks;
    })
    return tracks;
  }
  render() {
    return (
      <div className="SearchResults" >
        <h2>Results</h2>
        <TrackList tracks={this.searchFilter(this.props.searchResults)} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    );
  }
}

export default SearchResults;
