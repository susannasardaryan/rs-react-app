import React from "react";
import './Search.css'

interface Props {
    onSearch: (searchTerm: string) => void
}

type State = {
    inputValue: string;
}
class Search extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: localStorage.getItem('searchTerm') || ''
        }
    }

    toggleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ inputValue: event.target.value });
    }

    render(): JSX.Element {
        return <section className='searchSection'>
            <input type="text" onChange={(event) => this.toggleInputChange(event)} value={this.state.inputValue} />
            <button onClick={() =>  this.props.onSearch(this.state.inputValue)} className="searchSectionButton">Search</button>
        </section>
    }
}

export default Search;