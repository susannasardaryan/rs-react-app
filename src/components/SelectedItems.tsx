import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { unselectAllItems } from "../store/appSlice";

export default function SelectedItems() {
    const dispatch = useDispatch();
    const selectedItems = useSelector((state: RootState) => state.app.selectedItems);
    const [personData, setPersonData] = useState<{ name?: string; birth_year?: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await Promise.all(
                selectedItems.map((item) => fetch(`https://swapi.dev/api/people/${item}`).then(res => res.json()))
            );
            setPersonData(results);
        };

        fetchData();
    }, [selectedItems]);

    const downloadItems = () => {
        const csvContent = convertToCSV();

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedItems.length}_items.csv`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const convertToCSV = (): string => {
        const headers = ['Name', 'Birth Year'];
        const csv = [
            headers.join(','),
            ...personData.map((row) => [row.name, row.birth_year].join(',')),
        ].join('\n');
        return csv;
    };

    return (
        <>
            {selectedItems.length > 0 && (
                <div style={{
                    margin: '2px',
                }}>
                    <button
                        style={{ color: 'white', fontSize: '15px', background: 'black', padding: '5px', margin: '5px' }}
                        onClick={() => dispatch(unselectAllItems())}
                    >
                        Unselect {selectedItems.length} items
                    </button>
                    <button onClick={downloadItems} style={{ color: 'white', fontSize: '15px', background: 'black', padding: '5px'}}>Download {selectedItems.length} items</button>
                </div>
            )}
        </>
    );
}
