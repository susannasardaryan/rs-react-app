import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetSearchedDataQuery } from "../../store/ApiSlice";
import "./CardList.css";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";

type Props = {
    searchTermValue: string;
    onDataLoaded: (value: boolean) => void;
};


const CardList = (props: Props) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const pageNumber: number = parseInt(searchParams.get("page") || "1");
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetSearchedDataQuery({
        searchTermValue: props.searchTermValue,
        pageNumber,
    });

    useEffect(() => {
        if (error) {
            console.error("Error fetching data:", error);
            navigate("/404");
            return;
        }

        if (!isLoading && (!data || !data.results)) {
            navigate("/404");
            return; 
        }

        if (data?.results) {
            props.onDataLoaded(true);
        }
    }, [data, error, isLoading, navigate, props]);

    const handleItemClick = (id: string) => {
        navigate(`/details/${id}/?page=${pageNumber}`);
    };

    if (hasError) {
        throw new Error("I crashed!");
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section>
            {data?.results ? (
                <section className="cardList">
                    {data.results.map((man, index) => {
                        const splitedUrl = man.url.split("/");
                        const id = splitedUrl[5];
                        const imgUrl = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`;

                        return (
                            <div key={index}>
                                <Card
                                    person={man}
                                    image={imgUrl}
                                    onClick={() => handleItemClick(id)}
                                />
                            </div>
                        );
                    })}
                </section>
            ) : null}

            <div style={{ textAlign: "right", marginRight: "15px" }}>
                <button onClick={() => setHasError(true)} className="errorButton">
                    Error button
                </button>
            </div>
        </section>
    );
};

export default CardList;