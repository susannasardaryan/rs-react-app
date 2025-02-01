import './App.css'

import Search from './components/Search.tsx'
import Results from './components/Results.tsx'
import { Component } from 'react'

type State = {
  searchTerm: String,
  hasError: boolean
}
class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      hasError: false
    }
  }

  handleSearch(value: string) {
    this.setState({ searchTerm: value });
    localStorage.setItem('searchTerm', value);
  }
  throwError() {
    this.setState({ hasError: true })
  }
  render(): JSX.Element {
    if (this.state.hasError) {
      throw new Error('I crashed!');
    }

    return (
      <>
        <Search onSearch={this.handleSearch.bind(this)}></Search>
        <Results searchTermValue={this.state.searchTerm}></Results>
        <button onClick={this.throwError.bind(this)}>Error button</button>
      </>
    )
  }

}

export default App
