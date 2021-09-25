export enum CellType {
    Code = "Code",
    Text = "Text"
};

export interface Cell { id: string; type: CellType, content: string };

