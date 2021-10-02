import React from 'react'
import { useTypedSelector } from '../hooks/use-typed-selector'
import CellListItem from './cell-list-item';

interface CellListProps {

}

const CellList: React.FC<CellListProps> = () => {
    const cells = useTypedSelector(({ cells }) => cells?.order.map(id => cells.data[id]));

    const renderedCells = cells?.map(cell => <CellListItem key={cell.id} cell={cell} />);

    return (
        <div>
            {renderedCells}
        </div>
    )
}

export default CellList
