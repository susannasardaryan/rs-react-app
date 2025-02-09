import './Card.css';

interface Props {
  person: Person;
  image: string;
  onClick?: () => void; // Make onClick optional
}

interface Person {
  name: string;
  birth_year: string;
}

const Card = ({ person, image, onClick }: Props) => {
  return (
    <div className="card" onClick={onClick} role="button">
      <p>{person.name}</p>
      <img src={image} alt={person.name} />
      <p>Birth Year: {person.birth_year}</p>
    </div>
  );
};

export default Card;