import { useEffect, useState } from "react";
import './CardList.css'
import Card from "./Card";
type State = {
        results: null | People[];
} | null;

type Props = {
    searchTermValue: String,
}
interface People {
    name: string;
    birth_year: string;
}
const Results = (props: Props) => {
    const [PEOPLE_DATA, setPeopleData] = useState<State>(null);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(():void => {
        fetch(`https://swapi.dev/api/people/?page=1&search=${props.searchTermValue || ''}`).
            then(res => res.json()).
            then(res => setPeopleData(res)).
            catch(err => { throw new Error(err) })
    }, [props.searchTermValue])


    if (hasError) {
        throw new Error('I crashed!');
    }

    return <section>
        {!PEOPLE_DATA ? (
            <div className="loaderSection">
                <span className="loader"></span>
            </div>
        )
            : (
                <section className="cardList">
                        {PEOPLE_DATA.results?.map((man, index) => (
                            <Card key={index} person ={man} image={`https://starwars-visualguide.com/assets/img/characters/${index+1}.jpg`}/>
                        ))
                        }
                </section>

            )}
        <div style={{
            textAlign: "right",
            marginRight: '15px'
        }}>
            <button onClick={() => setHasError(true)} className="errorButton">Error button</button>
        </div>

    </section>
}

export default Results;