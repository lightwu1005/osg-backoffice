import {Data} from "ejs";

export interface BarChartDataProps {
    type?: 'axis' | 'item'
    title?: string
    data: Data
}