import './App.css'

import Search from './components/Search.tsx'
import CardList from './components/CardList.tsx'
import { useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import Pagination from './components/Pagination.tsx'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {

  const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('searchTerm') || '')
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [dataLoaded, setDataLoaded] = useState(false);

  function handleSearch(value: string) {
    setSearchTerm(value);
    localStorage.setItem('searchTerm', value);
  }

  return (
    <Router>
      <Search onSearch={handleSearch}></Search>
      <ErrorBoundary>
        <CardList searchTermValue={searchTerm} pageNumber={pageNumber} onDataLoaded={setDataLoaded} ></CardList>
      </ErrorBoundary>
      {dataLoaded &&
        <Pagination nextPage={() => setPageNumber(pageNumber + 1)} prevPage={() => setPageNumber(pageNumber - 1)}/>
      }
    </Router>
  )

}

export default App
