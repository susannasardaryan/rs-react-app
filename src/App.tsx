import './App.css'

import Search from './components/Search.tsx'
import Results from './components/Results.tsx'
import { Component } from 'react'
import ErrorBoundary from './components/ErrorBoundary.tsx'

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

  render(): JSX.Element {
    return (
      <>
        <Search onSearch={this.handleSearch.bind(this)}></Search>
        <ErrorBoundary>
          <Results searchTermValue={this.state.searchTerm}></Results>
        </ErrorBoundary>
      </>
    )
  }

}

export default App
