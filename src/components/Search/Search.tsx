import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Search.css'

interface Props {
    onSearch: (searchTerm: string) => void
}


const Search = (props: Props) => {
    let navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>(localStorage.getItem('searchTerm') || '');

    function handleClick(){
        props.onSearch(inputValue);
        navigate(`?search=${inputValue}&page=1`)

    }
    return <section className='searchSection'>
        <input type="text" onChange={(event) => setInputValue(event.target.value)} value={inputValue} />
        <button onClick={handleClick} className="searchSectionButton">Search</button>
    </section>

}

export default Search;