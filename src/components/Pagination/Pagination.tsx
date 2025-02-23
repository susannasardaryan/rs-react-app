// Pagination.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageNumber } from '../../store/appSlice';
import './Pagination.css';

const Pagination = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const pageNumber = parseInt(searchParams.get("page") || '1');

  useEffect(() => {
    dispatch(setPageNumber(pageNumber));
  }, [pageNumber, dispatch]);

  const handleNextPageClick = () => {
    navigate(`?page=${pageNumber + 1}`);
  };

  const handlePrevPageClick = () => {
    if (pageNumber > 1) {
      navigate(`?page=${pageNumber - 1}`);
    }
  };

  return (
    <>
      <button
        onClick={handlePrevPageClick}
        className="paginationButton"
        disabled={pageNumber <= 1}
      >
        Prev
      </button>
      <span style={{ color: 'white' }}> Page {pageNumber} </span>
      <button
        onClick={handleNextPageClick}
        className="paginationButton"
      >
        Next
      </button>
    </>
  );
};

export default Pagination;