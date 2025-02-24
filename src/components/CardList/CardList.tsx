import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSearchedDataQuery } from "../../store/ApiSlice";
import "./CardList.css";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import SelectedItems from "../SelectedItems";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type Props = {
    searchTermValue: string;
    onDataLoaded: (value: boolean) => void;
};


const CardList = (props: Props) => {
    const pageNumber = useSelector((state: RootState) => state.app.pageNumber);
    const navigate = useNavigate();

    const { data, error, isFetching, isSuccess  } = useGetSearchedDataQuery({
        searchTermValue: props.searchTermValue,
        pageNumber,
    });

    useEffect(() => {
        if (error) {
            console.error("Error fetching data:", error);
            navigate("/404");
            return;
        }

        if (!data || data.count === 0) {
            navigate("/404");
            return;
        }

        if (isSuccess && data?.results) {
            props.onDataLoaded(true);
        }
    }, [data, error, isFetching , navigate, props, pageNumber]);

    const handleItemClick = (id: string) => {
        navigate(`/details/${id}/?page=${pageNumber}`);
    };

    if (isFetching ) {
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
                                    id = {id}
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
               <SelectedItems/>
            </div>
        </section>
    );
};

export default CardList;