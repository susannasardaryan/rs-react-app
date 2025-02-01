import './App.css'

import Search from './components/Search.tsx'
import Results from './components/Results.tsx'
import { Component } from 'react'
import ErrorBoundary from './components/ErrorBoundary.tsx'
type State = {
  searchTerm: String
}
class App extends Component<{},State> {
constructor(props:{}){
  super(props)
  this.state = {
    searchTerm: localStorage.getItem('searchTerm') || ''
  }
}

handleSearch(value:string){
  this.setState({ searchTerm: value });
  localStorage.setItem('searchTerm', value);
}
throwError(){
  throw new Error('I crashed!');
}
render():JSX.Element{
  return (
    <ErrorBoundary>
      <Search onSearch={ this.handleSearch.bind(this)}></Search>
      <Results searchTermValue={this.state.searchTerm}></Results>
      <button onClick={this.throwError.bind(this)}>Error button</button>
    </ErrorBoundary>

  )
}

}

export default App
