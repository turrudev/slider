import {CSSProperties} from "aphrodite/typings/css-properties";

export default class GridUtils {
    static setRow(start: Number, end: Number = start): CSSProperties {
        return {
            gridRow: `${start} / ${end}`
        };
    }

    static setCol(start: Number, end: Number = start): CSSProperties {
        return {
            gridColumn: `${start} / ${end}`
        }
    }

    static setRowCol(row: Number, col: Number): CSSProperties {
        return {
            ...this.setCol(col),
            ...this.setRow(row)
        };
    }

    static define(rows: string = "auto", cols: string = "auto"): CSSProperties {
        return {
            display: "grid",
            gridTemplateRows: rows,
            gridTemplateColumns: cols
        };
    }

    static defineAndSet(rows: string, cols: string, row: number, col: number): CSSProperties {
        return {
            ...this.define(rows, cols),
            ...this.setRowCol(row, col)
        }
    }
}