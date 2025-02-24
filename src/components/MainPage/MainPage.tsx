import { Outlet, useLocation } from "react-router-dom";
import CardList from '../CardList/CardList.tsx';
import './MainPage.css';
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";
import { peopleDataApi } from "../../store/ApiSlice.tsx";
import { store } from "../../store/store.ts";

type Props = {
    searchTermValue: string,
    onDataLoaded: (value: boolean) => void
}
const MainPage = ({ searchTermValue, onDataLoaded }: Props) => {
    const location = useLocation();
    const showDetails = location.pathname.includes("details");

    return (
        <div className="split-view">
            <div className="left-section">
                <ApiProvider api={peopleDataApi}>
                    <Provider store={store}>
                        <CardList searchTermValue={searchTermValue} onDataLoaded={onDataLoaded} />
                    </Provider>
                </ApiProvider>
            </div>


            {showDetails && (
                <div className="right-section">
                    <ApiProvider api={peopleDataApi}>
                        <Outlet />
                    </ApiProvider>

                </div>
            )}
        </div>
    );
};

export default MainPage;