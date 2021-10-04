import React from 'react';
import useActions from '../hooks/use-actions';
import { CellType } from '../state';
import './add-cell.css';

interface AddCellProps {
    prevCellId: string;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId }) => {
    const { insertCellAfter } = useActions();

    return (
        <div className="add-cell">
            <div className="add-buttons">
                <button className="button is-small is-primary is-rounded" onClick={() => insertCellAfter({ id: prevCellId, type: CellType.Code })}>
                    <span className="icon is-small"><i className="fas fa-plus"></i></span>
                    <span>Code</span>
                </button>
                <button className="button is-small is-primary is-rounded" onClick={() => insertCellAfter({ id: prevCellId, type: CellType.Text })}>
                    <span className="icon is-small"><i className="fas fa-plus"></i></span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider" />
        </div>
    )
}

export default AddCell;
