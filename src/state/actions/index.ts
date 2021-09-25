import { ActionType } from '../action-types';
import { CellType } from '../cell';

export enum MoveCellDirection {
    Up = "Up",
    Down = "Down"
}

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: MoveCellDirection;
    }
}
export interface DeleteCellAction {
    type: ActionType.DELETE_CELL
    payload: {
        id: string;
    }
}
export interface InsertCellBeforeAction {
    type: ActionType.INSERT_CELL_BEFORE
    payload: {
        id: string;
        type: CellType;
    }
}


export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL
    payload: {
        id: string;
        content: string;
    }
}
export interface FetchCellAction {
    type: ActionType.FETCH_CELL
    payload: {
        id: string;
    }
}


export type Action = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction | FetchCellAction;

