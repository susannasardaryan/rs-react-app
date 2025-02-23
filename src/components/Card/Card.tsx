// Card.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addItem, removeItem } from "../../store/appSlice";
import "./Card.css";
import { useState } from "react";

interface Props {
  id: string;
  person: Person;
  image: string;
  onClick?: () => void;
}

interface Person {
  name: string;
  birth_year: string;
}

const Card = ({ onClick,id, person, image }: Props) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.app.selectedItems);

  const [checked, setChecked] = useState<boolean>(selectedItems.includes(id))
  const handleClick = () => {
    if(!checked){
      console.log(selectedItems);
      dispatch(addItem(id));
    }else{
      dispatch(removeItem(id));
    }
    setChecked(prevstate => !prevstate);
  };

  return (
    <div className="card"  role="button" onClick={onClick}>
      <p>{person.name}</p>
      <input type="checkbox" name={person.name} id={id} checked={selectedItems.includes(id)} onChange={handleClick}/>
      <img src={image} alt={person.name} />
      <p>Birth Year: {person.birth_year}</p>
    </div>
  );
};

export default Card;