import { Dispatch } from "react";
import bundler from "../../bundler";
import { ActionType } from "../action-types";
import { Action, DeleteCellAction, InsertCellAfterAction, MoveCellAction, MoveCellDirection, UpdateCellAction } from "../actions";
import { CellType } from "../cell";


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

export const createBundle = ({ cellId, input }: { cellId: string, input: string }) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.BUNDLE_START, payload: { cellId } });

        const bundle = await bundler(input)

        dispatch({ type: ActionType.BUNDLE_COMPLETE, payload: { cellId, bundle } })
    }
};