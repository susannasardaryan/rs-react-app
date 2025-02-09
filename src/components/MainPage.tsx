import { Outlet, useLocation } from "react-router-dom";
import CardList from './CardList.tsx';
import './MainPage.css'; // Add styles for the split view
type Props = {
    searchTermValue: String,
    onDataLoaded: (value: boolean) => void
}
const MainPage = ({ searchTermValue, onDataLoaded }: Props) => {
    const location = useLocation();
    const showDetails = location.pathname.includes("details");

    return (
        <div className="split-view">
            <div className="left-section">
                <CardList searchTermValue={searchTermValue} onDataLoaded={onDataLoaded} />
            </div>


            {showDetails && (
                <div className="right-section">
                    <Outlet />
                </div>
            )}
        </div>
    );
};

export default MainPage;