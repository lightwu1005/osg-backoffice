import {PerformanceDataModel} from "@/services/@core/module/ResponseDataModels";
import {BarchartDataSet} from "@/modules/components/charts/CommonHorizontalBarchart";
import {BarChartProps, PieChartProps, toBarchartParameters} from "@/app/dashboard/models/EventQueryParameters";

export const getLabels = (data: PerformanceDataModel[]) => {
    return data?.map(item => item.infoTitle) ?? []
}

export const getInfoIds = (data: PerformanceDataModel[]) => {
    return data?.map(item => item.infoId) ?? []
}

export const getDisplayData = (data: PerformanceDataModel[], type: string) => {
    if (!data) return []

    const uniqueDataNames = Array.from(data.reduce((acc, item) => {
        item.infoData.forEach(dataItem => {
            acc.add(dataItem.dataName);
        });
        return acc;
    }, new Set()));
    const infoDataArray = data.map(item => item.infoData)
    const separatedArray = uniqueDataNames.map(name =>
        infoDataArray.flatMap(item => item.filter(b => b.dataName === name))
    )

    switch (type) {
        case 'percentage': {
            return separatedArray.map(item => {
                const data: BarchartDataSet = {
                    data: item.map(a => a.dataNumber),
                    label: item[0].dataName,
                    stack: 'stake'
                }
                return data
            })
        }
        case 'number':
        case 'money':
        default: {
            return [
                {
                    data: separatedArray.flatMap(item => item.map(a => a.dataNumber)),
                    label: '',
                    stack: ''
                }
            ]
        }
    }
}

export const toBarchartProps = ({title, subTitle, dataType, data}: toBarchartParameters): BarChartProps => {
    return {
        title: title,
        subTitle: subTitle,
        dataType: dataType,
        height: 300,
        colors: dataType === 'percentage' ? ['#8657FF', '#76CAFF'] : ['#6B8BFF'],
        labels: getLabels(data),
        infoIds: getInfoIds(data),
        data: getDisplayData(data, dataType)
    }
}

export const toPieChartProps = (data: PerformanceDataModel[]): PieChartProps[] => {
    if (!data) return []
    else
    return data.map(item => {
        const newInfo = item.infoData.map(item => {
            return {label: item.dataName, value: Math.abs(item.dataNumber)}
        })
        return {...item, infoData: newInfo}
    })
}