import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term : this.getSavedTerm('term')
    }
    this.getSavedTerm = this.getSavedTerm.bind(this);
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
  //save the term value to sessionStorage
  this.saveValue(e.target.value);
  }
  //If you press enter, a search is triggered.
  handleKeyPress(e){
    if(e.key=== 'Enter'){
      this.search();
    }
  }
  //save actual term
  saveValue(v){
      sessionStorage.setItem('term', v); //saved to sessionStorage, data in sessionStorage will be deleted after the tab is closed
     }

 //get the saved term
  getSavedTerm(v){
    let savedValue = sessionStorage.getItem(v);
    //prevenir errores.
    if (savedValue === null) {
      return "";
    }

    //if there are not search results, the saved term will be searched.
    if (this.props.searchResults.length==0){
      this.props.onSearch(savedValue)
    }
    return savedValue;



  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} defaultValue={this.getSavedTerm("term")} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }

}

export default SearchBar;
