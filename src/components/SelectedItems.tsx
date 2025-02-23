import { useSelector } from "react-redux";
import {RootState} from '../store/store'

export default function SelectedItems(){
    const selectedItems = useSelector((state: RootState) => state.app.selectedItems);
    return <>

      { selectedItems.length && <p style={{
            color: 'white',
            fontSize: '25px',
        }}>Selected items {selectedItems.length}</p>}
    </>
}