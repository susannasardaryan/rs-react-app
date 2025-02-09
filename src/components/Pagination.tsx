interface Props {
    nextPage: () => void,
    prevPage: () => void,
}


const Pagination = (props: Props) => {
    return <>
        <button onClick={() => props.prevPage()}>Prev</button>
        ...pages
        <button onClick={() => props.nextPage()}>Next</button>
    </>
}

export default Pagination;