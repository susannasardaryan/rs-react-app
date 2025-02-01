import React from "react";

type State = {
    searchTerm: string;
};

class Search extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }
    toggleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.value);
        this.setState({ searchTerm: event.target.value });
    }
    handleClick() {
        console.log('Sending data', this.state.searchTerm)
    }
    render() {
        return <>
            <input type="text" onChange={(event) => this.toggleInputChange(event)} />
            <button onClick={this.handleClick.bind(this)}>Search</button>
        </>
    }
}

export default Search;