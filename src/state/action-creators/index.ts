import { ActionType } from "../action-types";
import { DeleteCellAction, InsertCellBeforeAction, MoveCellAction, MoveCellDirection, UpdateCellAction } from "../actions";
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

export const insertCellBefore = ({ id, type }: { id: string, type: CellType }): InsertCellBeforeAction => ({
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
        id,
        type
    }
})
