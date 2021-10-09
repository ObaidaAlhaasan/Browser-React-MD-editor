import React from 'react'
import { useTypedSelector } from '../hooks/use-typed-selector'
import AddCell from './add-cell';
import CellListItem from './cell-list-item';
import './cell-list.css';

interface CellListProps {
}

const CellList: React.FC<CellListProps> = () => {
    const cells = useTypedSelector(({ cells }) => cells?.order.map(id => cells.data[id]));

    const renderedCells = cells?.map(cell =>
        <React.Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell prevCellId={cell.id} />
        </React.Fragment>
    );

    return (
        <div className="cell-list">
            <>
                <AddCell prevCellId={''} />
                {renderedCells}
            </>
        </div>
    )
}

export default CellList
