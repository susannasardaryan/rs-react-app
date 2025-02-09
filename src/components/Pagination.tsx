import './Pagination.css'

interface Props {
    nextPage: () => void,
    prevPage: () => void,
}


const Pagination = (props: Props) => {
    return <>
        <button onClick={() => props.prevPage()} className="paginationButton">Prev</button>
        ...pages
        <button onClick={() => props.nextPage()} className="paginationButton">Next</button>
    </>
}

export default Pagination;