import { useNavigate, useParams } from "react-router-dom";
import { useGetPersonDataQuery } from "../store/ApiSlice";

const Details = () => {
    const { id } = useParams<{ id: string, }>();
    const navigate = useNavigate();

    const { data } = useGetPersonDataQuery(id || "", { skip: !id });
    if (!id) {
        return <div>Invalid ID</div>;
    }

    const imgUrl: string = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`;
    return (
        <>
            <img src={imgUrl} alt="Person" />
            <div style={{
                color: 'white'
            }}>
                <p>Name: {data?.name}</p>
                <p>Height: {data?.height}</p>
                <p>Mass: {data?.mass}</p>
                <p>Birth Year: {data?.birth_year}</p>
            </div>

            <button onClick={() => navigate("/")}>
                Close
            </button>
        </>
    );
};

export default Details;