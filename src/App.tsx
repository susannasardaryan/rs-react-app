import './App.css'

import Search from './components/Search.tsx'
import Results from './components/CardList.tsx'
import {useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary.tsx'


const App = () =>{

const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('searchTerm') || '')


  function handleSearch(value: string) {
    setSearchTerm(value);
    localStorage.setItem('searchTerm', value);
  }

    return (
      <>
        <Search onSearch={handleSearch}></Search>
        <ErrorBoundary>
          <Results searchTermValue={searchTerm}></Results>
        </ErrorBoundary>
      </>
    )

}

export default App
