import React from "react";
type State = {
    FILM_DATA: {
        results: null | Film[];
    } | null
}

interface Film {
    title: string;
    director: string;
}
class Results extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            FILM_DATA: null,
        }
    }

    componentDidMount(): void {
        fetch("https://swapi.dev/api/films/").
            then(res => res.json()).
            then(res => this.setState({ FILM_DATA: res })).
            catch(err => console.log(err))
    }

    componentWillUnmount(): void {
        console.log('Error')
    }

    render(): JSX.Element {
        const { FILM_DATA } = this.state;
        return <>
            {!FILM_DATA ? (
                <div>
                    <td colSpan={2}>Loading...</td>
                </div>
            )
                : (
                    <table>
                        <thead>
                            <tr>
                                <th>Film Name</th>
                                <th>Director</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FILM_DATA.results?.map((film, index) => (
                                <tr key={index}>
                                    <td>{film.title}</td>
                                    <td>{film.director}</td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                )}
        </>
    }
}

export default Results;