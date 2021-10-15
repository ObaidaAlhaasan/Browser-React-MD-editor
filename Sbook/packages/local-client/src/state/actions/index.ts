import { Cell } from '..';
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
export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER
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
export interface FetchCellsAction {
    type: ActionType.FETCH_CELLS
}

export interface FetchCellsCompleteAction {
    type: ActionType.FETCH_CELLS_COMPLETE;
    payload: {
        cells: Cell[]
    }
}

export interface FetchCellsErrorAction {
    type: ActionType.FETCH_CELLS_ERROR;
    payload: {
        isSuccessful: boolean;
        msgAsString: string
    }
}

export interface SaveCellsErrorAction {
    type: ActionType.SAVE_CELLS_ERROR;
    payload: string;
}


export interface BundleStartAction {
    type: ActionType.BUNDLE_START;
    payload: {
        cellId: string;
    }
}


export interface BundleCompleteAction {
    type: ActionType.BUNDLE_COMPLETE;
    payload: {
        cellId: string;
        bundle: {
            code: string;
            err: string;
        }
    }
}


export type Action = MoveCellAction | DeleteCellAction | InsertCellAfterAction | SaveCellsErrorAction | UpdateCellAction | FetchCellsAction | BundleStartAction | BundleCompleteAction | FetchCellsCompleteAction | FetchCellsErrorAction;


