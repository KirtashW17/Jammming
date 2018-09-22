import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term : this.getSavedValue('term')
    }
    this.getSavedValue = this.getSavedValue.bind(this);
    this.search = this.search.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term)
  }
  //When the term of the search changes, the term state will be updated.
  handleTermChange(e){
  this.setState({term:e.target.value});
  console.log(this.state.term);
  //save the term value to sessionStorage
  this.saveValue(e.target);
  }
  //If you press enter, a search is triggered.
  handleKeyPress(e){
    if(e.key=== 'Enter'){
      this.search();
    }
  }
  //save actual term
  saveValue(e){
         var id = e.id;  // get the sender's id to save it .
         var val = e.value; // get the value.
         sessionStorage.setItem(id, val); //saved to sessionStorage, data in sessionStorage will be deleted after the tab is closed
     }

 //get the saved term
  getSavedValue(v){
    if (sessionStorage.getItem(v) === null) {
      return "";
    }
    let savedValue = sessionStorage.getItem(v);
    //if there are not search results, the saved term will be searched.
    if (this.props.searchResults.length==0){
      this.props.onSearch(savedValue)
    }
    return savedValue;



  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} id="term" defaultValue={this.getSavedValue("term")} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }

}

export default SearchBar;
