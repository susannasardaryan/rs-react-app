import './Card.css'

interface Props {
    person: Person,
    image : string
}

interface Person {
    name: string;
    birth_year: string;
}

const Card = ({person, image}: Props) => {
    return <div className='card'>
        <p>{person.name}</p>
        <img src={image} alt="" />
        <p>Birth Year: {person.birth_year}</p>
    </div>
}

export default Card;