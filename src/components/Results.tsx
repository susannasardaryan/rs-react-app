import React from "react";
import './Results.css'
type State = {
    PEOPLE_DATA: {
        results: null | People[];
    }| null,
}
type Props ={
    searchTermValue: String,
}
interface People {
    name: string;
    hair_color: string;
    birth_year: string;
    gender: string;
}
class Results extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            PEOPLE_DATA: null,
        }
    }

    componentDidMount(): void {
        fetch(`https://swapi.dev/api/people/`).
            then(res => res.json()).
            then(res => this.setState({ PEOPLE_DATA: res })).
            catch(err => console.log(err))
    }

    componentDidUpdate(): void {
        fetch(`https://swapi.dev/api/people/?search=${this.props.searchTermValue || ''}`).
            then(res => res.json()).
            then(res => this.setState({ PEOPLE_DATA: res })).
            catch(err => console.log(err))
    }

    render(): JSX.Element {
        const { PEOPLE_DATA } = this.state;
        return <>
            {!PEOPLE_DATA ? (
                <div className="loaderSection">
                    <span className="loader"></span>
                </div>
            )
                : (
                    <table>
                        <thead className="tableHeader">
                            <tr>
                                <td>Hero Name</td>
                                <td>Description </td>
                            </tr>
                        </thead>
                        <tbody>
                            {PEOPLE_DATA.results?.map((man, index) => (
                                <tr key={index}>
                                    <td>{man.name}</td>
                                    <td>{man.name} has {man.hair_color} hair, was born in {man.birth_year}, and is {man.gender}.</td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                )}
        </>
    }
}

export default Results;