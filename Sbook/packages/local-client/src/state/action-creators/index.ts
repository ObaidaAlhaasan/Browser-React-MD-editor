import { Dispatch } from "react";
import bundler from "../../bundler";
import { ActionType } from "../action-types";
import { Action, DeleteCellAction, FetchCellsAction, InsertCellAfterAction, MoveCellAction, MoveCellDirection, UpdateCellAction } from "../actions";
import { CellType } from "../cell";
import axios from 'axios';
import { Cell, RootState } from "..";


export const updateCell = ({ id, content }: { id: string, content: string }): UpdateCellAction => ({
    type: ActionType.UPDATE_CELL,
    payload: {
        id,
        content
    }
});

export const deleteCell = ({ id }: { id: string }): DeleteCellAction => ({
    type: ActionType.DELETE_CELL,
    payload: {
        id
    }
})

export const moveCell = ({ id, direction }: { id: string, direction: MoveCellDirection }): MoveCellAction => ({
    type: ActionType.MOVE_CELL,
    payload: {
        id,
        direction
    }
})

export const insertCellAfter = ({ id, type }: { id: string, type: CellType }): InsertCellAfterAction => ({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id,
        type
    }
})

export const fetchCells = ({ type }: { type: CellType }) => {

    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.FETCH_CELLS });

        try {
            const { data }: { data: { cells: Cell[] } } = await axios.get('/cells');
            console.log(data);
            dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: { cells: data.cells } });
        } catch (error: any) {
            dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: { msgAsString: error.message, isSuccessful: false } });
        }
    };
}

export const createBundle = ({ cellId, input }: { cellId: string, input: string }) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.BUNDLE_START, payload: { cellId } });

        const bundle = await bundler(input)

        dispatch({ type: ActionType.BUNDLE_COMPLETE, payload: { cellId, bundle } })
    }
};

export const SaveCells = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
        const { cells: { data, order } } = getState();
        const cells = order.map(id => data[id]);

        try {
            const response = await axios.post("/cells", { cells });
            console.log(response);

        } catch (error: any) {
            dispatch({
                type: ActionType.SAVE_CELLS_ERROR,
                payload: error.message
            })
        }

    };
}