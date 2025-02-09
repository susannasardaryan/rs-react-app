import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface State {
    name: string;
    height: string;
    mass: string;
    birth_year: string
};

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const [peopleDetails, setPeopleDetails] = useState<State | null>(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`https://swapi.dev/api/people/${id}/`)
                .then((res) => res.json())
                .then((res) => setPeopleDetails(res))
                .catch((err) => console.log(err));
        }
    }, [id]);
    const imgUrl: string = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    return (
        <>
            <img src={imgUrl} alt="Person" />
            <div style={{
                color: 'white'
            }}>
                <p>Name: {peopleDetails?.name}</p>
                <p>Height: {peopleDetails?.height}</p>
                <p>Mass: {peopleDetails?.mass}</p>
                <p>Birth Year: {peopleDetails?.birth_year}</p>
            </div>

            <button onClick={() => navigate("/")}>
                Close
            </button>
        </>
    );
};

export default Details;