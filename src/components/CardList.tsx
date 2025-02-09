import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './CardList.css'
import Card from "./Card";
import Loader from "./Loader";
type State = {
        results: null | People[];
} | null;

type Props = {
    searchTermValue: String,
    onDataLoaded: (value: boolean) => void
}
interface People {
    name: string;
    birth_year: string;
    url : string;
}
const Results = (props: Props) => {
    const [PEOPLE_DATA, setPeopleData] = useState<State>(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get("page") || "1");

    useEffect(():void => {
        fetch(`https://swapi.dev/api/people/?page=${pageNumber || 1}&search=${props.searchTermValue || ''}`).
            then(res => res.json()).
            then(res => {
                setPeopleData(res)
                props.onDataLoaded(true);
            }).
            catch(err => { throw new Error(err) })
    }, [props.searchTermValue, pageNumber])


    if (hasError) {
        throw new Error('I crashed!');
    }

    return <section>
        {!PEOPLE_DATA ? (
            <Loader />
        )
            : (
                <section className="cardList">
                        {PEOPLE_DATA.results?.map((man, index) => {
                            let splitedUrl:string[] = man.url.split('/');
                            let id:string = splitedUrl[5];
                            return <Card key={index} person ={man} image={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>
                        }
                    )}
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