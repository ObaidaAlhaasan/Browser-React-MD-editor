export declare enum CellType {
    Code = "Code",
    Text = "Text"
}
export interface Cell {
    id: string;
    type: CellType;
    content: string;
}
export declare const createCellsRouter: (fileName: string, dirName: string) => import("express-serve-static-core").Router;
