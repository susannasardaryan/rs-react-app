import './Pagination.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Pagination = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pageNumber = parseInt(searchParams.get("page") || "1");

    function handleNextPageClick() {
        navigate(`?page=${pageNumber + 1}`);
    }

    function handlePrevPageClick() {
        if (pageNumber > 1) {
            navigate(`?page=${pageNumber - 1}`);
        }
    }

    return (
        <>
            <button
                onClick={handlePrevPageClick}
                className="paginationButton"
                disabled={pageNumber <= 1}
            >
                Prev
            </button>
            <span style={{color: 'white'}}> Page {pageNumber} </span>
            <button
                onClick={handleNextPageClick}
                className="paginationButton"
            >
                Next
            </button>
        </>
    );
}

export default Pagination;
