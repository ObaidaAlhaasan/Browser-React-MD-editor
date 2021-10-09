import { Action, MoveCellDirection } from "../actions";
import { ActionType } from "../action-types";
import { Cell } from "../cell";
import produce from 'immer';
import { generateRandomId } from "../../utils/utils";

export interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell
    }
}

const initialState: CellState = { loading: false, error: null, order: [], data: {} };


const reducer = produce((state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const { content } = action.payload;
            state.data[action.payload.id].content = content;
            return state;

        case ActionType.DELETE_CELL:
            delete state.data[action.payload.id];
            state.order = state.order.filter(oId => oId !== action.payload.id);
            return state;

        case ActionType.MOVE_CELL:
            const { direction } = action.payload;
            const ind = state.order.findIndex(oId => oId === action.payload.id);
            const targetInd = direction === MoveCellDirection.Up ? ind - 1 : ind + 1;

            if (targetInd < 0 || targetInd > state.order.length - 1)
                return state;

            state.order[ind] = state.order[targetInd];
            state.order[targetInd] = action.payload.id;
            return state;

        case ActionType.INSERT_CELL_AFTER:
            const { type } = action.payload;
            const cell: Cell = { id: generateRandomId(), type, content: '' };

            state.data[cell.id] = cell;

            const index = state.order.findIndex(oId => oId === action.payload.id);
            if (index < 0)
                state.order.unshift(cell.id);
            else
                state.order.splice(index +1, 0, cell.id);

            return state;

        default:
            return state;
    }
}, initialState);

export default reducer;