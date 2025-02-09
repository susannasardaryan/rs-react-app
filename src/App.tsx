import './App.css'

import Search from './components/Search.tsx'
import CardList from './components/CardList.tsx'
import {useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import Pagination from './components/Pagination.tsx'

const App = () =>{

const [searchTerm, setSearchTerm] = useState<string>(localStorage.getItem('searchTerm') || '')
const [pageNumber, setPageNumber] = useState<number>(1);
const [dataLoaded, setDataLoaded] = useState(false);

  function handleSearch(value: string) {
    setSearchTerm(value);
    localStorage.setItem('searchTerm', value);
  }

    return (
      <>
        <Search onSearch={handleSearch}></Search>
        <ErrorBoundary>
          <CardList searchTermValue={searchTerm} pageNumber={pageNumber} onDataLoaded={setDataLoaded} ></CardList>
        </ErrorBoundary>
        {dataLoaded &&
        <Pagination nextPage={() => setPageNumber(pageNumber+1 )} prevPage={()=>setPageNumber(pageNumber-1 )}></Pagination>

      }  </>
    )

}

export default App
