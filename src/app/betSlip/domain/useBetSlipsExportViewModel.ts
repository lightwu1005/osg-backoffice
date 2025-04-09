import {useCallback, useMemo, useState} from "react";
import useBetSlipRepository from "@/services/@betslips/repository/useBetSlipsRepository";
import {BetSlipsExportParameters} from "@/app/betSlip/models/BetSlipsParameters";
import {toBetSlipExportProps} from "@/app/betSlip/models/RequestDataMapping";
import {GlobalController} from "@/modules/common/GlobalController";
import {useIntl} from "react-intl";
import { LocalizationFunctionType } from "@/localizedConfig/LanguageContext";
import dayjs from "dayjs";

const useBetSlipsExportViewModel = () => {
    const betSlipsRepo = useBetSlipRepository()
    const betSlipExport = useCallback(async (params: BetSlipsExportParameters) => {
        return await betSlipsRepo.betSlipExport(toBetSlipExportProps(params))
    },[betSlipsRepo])

    const globalController = GlobalController.getInstance()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fieldsValues, setFieldsValues] = useState<BetSlipsExportParameters>(() => {
        const startDate = dayjs().tz().startOf('day').unix()
        const endDate = dayjs().tz().endOf('day').unix()
        return {
            startDate,
            endDate,
        }
    })

    const intl = useIntl()
    const funType = LocalizationFunctionType.BetSlip
    const funCommonType = LocalizationFunctionType.Common

    const isSubmitEnabled = useMemo(() => {
        if (!fieldsValues) return false
        const {
            startDate,
            endDate
        } = fieldsValues;

        return startDate && endDate
    }, [fieldsValues])

    const submitExport = async () => {
        if(fieldsValues?.startDate && fieldsValues?.endDate){
            const start = fieldsValues?.startDate
            const end = fieldsValues?.endDate

            setIsLoading(true)

            betSlipExport({startDate:start, endDate:end})
                .then((response) => {
                    globalController.dispatch(GlobalController.KEY_TOAST_ALERT, {
                        severity: response.isSuccess ? 'success' : 'error',
                        show: true,
                        message: response.result
                    });
                })
                .finally(() => setIsLoading(false))
        }
    }

    return {
        isLoading,
        dateRange: {
            startDate: fieldsValues?.startDate ? dayjs(fieldsValues?.startDate * 1000) : null,
            endDate: fieldsValues?.endDate ? dayjs(fieldsValues?.endDate * 1000) : null
        },
        setFieldsValues,
        isSubmitEnabled,
        submitExport,
        intl,
        funType,
        funCommonType
    }
}

export default useBetSlipsExportViewModel