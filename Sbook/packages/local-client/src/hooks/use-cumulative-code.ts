import { CellType } from "../state";
import { useTypedSelector } from "./use-typed-selector";

const Show = `var Show = (val) => {
    const root = document.querySelector("#root");

    let renderedVal = val;
    if (val.$$typeof && val.props) {
        _ReactDOM.render(val, root)
        return;
    }
    if (typeof val === "object") {
        renderedVal = JSON.stringify(val);
    }
    root.innerHTML = renderedVal;
};`

const ShowNoOp = `var Show = (val) => { };`;

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector(({ cells: { order, data } }) => {
        const orderedCells = order.map(id => data[id]);
        const cumulativeCode = [
            `
            import _React from 'react';
            import _ReactDOM from 'react-dom'
            `
        ];

        for (const c of orderedCells) {
            const isSameCell = c.id === cellId;

            if (c.type === CellType.Code) {
                if (isSameCell) {
                    cumulativeCode.push(Show)
                } else {
                    cumulativeCode.push(ShowNoOp)
                }
                cumulativeCode.push(c.content);
            }

            if (isSameCell) {
                break;
            }
        }

        return cumulativeCode;
    });
}