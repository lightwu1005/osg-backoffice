'use client'
import {createContext, ReactNode, useContext} from "react"
import {useRouter} from "next/navigation"
import {CommonPieChartRecord} from "@/modules/components/charts/CommonPieChart"
import {GetBetSlipsFromEvent} from "@/app/betSlip/components/models/BetSlipParameters";

/**
 * @param chartNavigation this is used to navigate the page by Chart component.
 * @param obtainChartRecord this is used to obtain the DashboardChartRecord value when the page display
 * @param withCleanRecord if true, then will clean data after data obtained.
 */
interface ChartProviderProps {
    chartNavigation: (record: CommonPieChartRecord, toPage: string, query?: Record<string, any>) => void
    obtainChartRecord: (withCleanRecord?: boolean) => CommonPieChartRecord | undefined
}

/**
 * @param NormalProviderProps model use to general router action, redirect will cause `hot reload issue in dev environment`
 * @param obtainRecord this function would obtain the data that comes from Notification maybe
 */
interface NormalProviderProps {
    normalNavigation: (toPage: string, query?: Record<string, any>) => void
    obtainRecord: (withCleanRecord?: boolean) => Record<string, any> | undefined
}

/**
 * @param betSlipNavigation this is used to navigate BetSlip.
 * @param obtainChartRecord to display filter data
 */
interface BetSlipProviderProps {
    betSlipNavigation: (record: GetBetSlipsFromEvent, toPage: string, query?: Record<string, any>) => void
    obtainBetSlipRecord: (withCleanRecord?: boolean) => Promise<GetBetSlipsFromEvent | undefined>
}

interface NavigationProviderProps {
    chartProvider: ChartProviderProps
    normalProvider: NormalProviderProps
    betSlipProvider: BetSlipProviderProps
    cleanParameters: () => void
}

const NavigationContext = createContext<NavigationProviderProps | undefined>(undefined)

export const NavigationProvider = ({children}: { children: ReactNode }) => {
    const router = useRouter()
    const chartAccessKey = 'chartParameters'
    const normalAccessKey = 'normalParameters'
    const betSlipAccessKey = 'betSlipParameters'

    const chartNavigation = (record: CommonPieChartRecord, toPage: string, query?: Record<string, any>) => {
        sessionStorage.setItem(chartAccessKey, JSON.stringify(record))
        normalNavigation(toPage, query)
    }

    const betSlipNavigation = async (record: GetBetSlipsFromEvent, toPage: string, query?: Record<string, any>) => {
        sessionStorage.setItem(betSlipAccessKey, JSON.stringify(record))
        normalNavigation(toPage, query)
    }

    const normalNavigation = (toPage: string, query?: Record<string, any>) => {
        const pathname = toPage.startsWith('/') ? toPage : `/${toPage}`
        const params = query
            ? Object.keys(query).map(p => `${encodeURIComponent(p)}=${encodeURIComponent(query[p])}`).join('&')
            : ''
        const fullPath = params ? `${pathname}?${params}` : pathname
        router.push(fullPath)
    }

    const obtainChartRecord = (withCleanRecord: boolean = true): CommonPieChartRecord | undefined => {
        const recordString = sessionStorage.getItem(chartAccessKey)
        let record: CommonPieChartRecord | undefined
        if (recordString) {
            record = JSON.parse(recordString) as CommonPieChartRecord
            if (withCleanRecord) {
                sessionStorage.removeItem(chartAccessKey)
            }
        }
        return record
    }

    const obtainNormalRecord = (withCleanRecord: boolean = true): Record<string, any> | undefined => {
        const recordString = sessionStorage.getItem(normalAccessKey)
        let record: Record<string, any> | undefined
        if (recordString) {
            record = JSON.parse(recordString)
            if (withCleanRecord) {
                sessionStorage.removeItem(normalAccessKey)
            }
        }
        return record
    }

    const obtainBetSlipRecord = async (withCleanRecord: boolean = true): Promise<GetBetSlipsFromEvent | undefined> => {
        const recordString = sessionStorage.getItem(betSlipAccessKey)
        let record: Record<string, any> | undefined
        if (recordString) {
            record = JSON.parse(recordString)
            if (withCleanRecord) {
                sessionStorage.removeItem(betSlipAccessKey)
            }
        }
        return record
    }

    const cleanAllParameters = () => {
        sessionStorage.removeItem(chartAccessKey)
        sessionStorage.removeItem(normalAccessKey)
    }

    return (
        <NavigationContext.Provider value={{
            chartProvider: {chartNavigation, obtainChartRecord},
            normalProvider: {normalNavigation, obtainRecord: obtainNormalRecord},
            betSlipProvider: { betSlipNavigation, obtainBetSlipRecord },
            cleanParameters: cleanAllParameters,
        }}>
            {children}
        </NavigationContext.Provider>
    )
}

export const useNavigationProvider = () => {
    const context = useContext(NavigationContext)
    if (!context) {
        throw new Error('useNavigationProvider must be used within a NavigationProvider')
    }
    return context
}
