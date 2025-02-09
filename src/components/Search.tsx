import { useState } from "react";
import './Search.css'

interface Props {
    onSearch: (searchTerm: string) => void
}


const Search = (props: Props) => {
    const [inputValue, setInputValue] = useState<string>(localStorage.getItem('searchTerm') || '');


    return <section className='searchSection'>
        <input type="text" onChange={(event) => setInputValue(event.target.value)} value={inputValue} />
        <button onClick={() => props.onSearch(inputValue)} className="searchSectionButton">Search</button>
    </section>

}

export default Search;