import './App.css'

import Search from './components/Search.tsx'
import CardList from './components/CardList.tsx'
import { useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import Pagination from './components/Pagination.tsx'
import NotFound from './components/NotFound.tsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {

  const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('searchTerm') || '')
  const [dataLoaded, setDataLoaded] = useState(false);

  function handleSearch(value: string) {
    setSearchTerm(value);
    localStorage.setItem('searchTerm', value);
  }


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Search onSearch={handleSearch} />
              <ErrorBoundary>
                <CardList searchTermValue={searchTerm}  onDataLoaded={setDataLoaded} />
              </ErrorBoundary>
              {dataLoaded && (
                <Pagination/>
              )}
            </>

          }
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );

}

export default App
