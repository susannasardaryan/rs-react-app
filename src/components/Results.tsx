import React from "react";
import './Results.css'
type State = {
    PEOPLE_DATA: {
        results: null | People[];
    } | null,
    hasError: boolean
}
type Props = {
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
            hasError: false
        }
    }

    componentDidMount(): void {
        fetch(`https://swapi.dev/api/people/?page=1&search=${this.props.searchTermValue || ''}`).
            then(res => res.json()).
            then(res => this.setState({ PEOPLE_DATA: res })).
            catch(err => { throw new Error(err) })
    }

    throwError() {
        this.setState({ hasError: true })
    }

    componentDidUpdate(prevProps: Props): void {
        if (prevProps.searchTermValue !== this.props.searchTermValue) {
            this.setState({ PEOPLE_DATA: null });
            fetch(`https://swapi.dev/api/people/?page=1&search=${this.props.searchTermValue}`)
                .then(res => res.json())
                .then(res => this.setState({ PEOPLE_DATA: res }))
                .catch(err => { throw new Error(err) });
        }
    }

    render(): JSX.Element {
        const { PEOPLE_DATA } = this.state;
        if (this.state.hasError) {
            throw new Error('I crashed!');
        }
        return <section className="resultsSection">
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
                <div style={{
                    textAlign: "right",
                    marginRight: '15px'
                }}>
                    <button onClick={this.throwError.bind(this)} className="errorButton">Error button</button>
                </div>

        </section>
    }
}

export default Results;