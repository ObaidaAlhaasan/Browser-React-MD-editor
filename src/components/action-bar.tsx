import React from 'react';
import useActions from '../hooks/use-actions';
import { MoveCellDirection } from '../state/actions';
import './action-bar.css';

interface ActionBarProps {
    id: string;
};

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="action-bar">
            <button className="button is-primary is-small" onClick={() => moveCell({ id, direction: MoveCellDirection.Up })}>
                <span className="icon"><i className="fas fa-arrow-up"></i></span>
            </button>
            <button className="button is-primary is-small" onClick={() => moveCell({ id, direction: MoveCellDirection.Down })}>
                <span className="icon"><i className="fas fa-arrow-down"></i></span>
            </button>
            <button className="button is-primary is-small" onClick={(() => deleteCell({ id }))}>
                <span className="icon"><i className="fas fa-times"></i></span>
            </button>
        </div>
    )
}

export default ActionBar
