import {ImpactTemplatesViewProps} from "@/app/template/pageComponent/ImpactTemplatesView";
import {useRef, useState} from "react";
import {LeagueTableColumns} from "@/app/eventDetail/components/MarketsTableDialog";
import {ImpactTemplatesViewWordingType} from "@/app/template/models/useTranslateMapping";
import {ContentTableProps} from "@/modules/common/ContentTable";

const useImpactTemplatesViewModel = (props: Readonly<ImpactTemplatesViewProps>) => {
    const {newTemplates, oldTemplates, onFinished} = props
    const [isTableOpen, setIsTableOpen] = useState(false)
    const tabGeneralSettingArray: ImpactTemplatesViewWordingType[] = [
        ImpactTemplatesViewWordingType.TAB_Feeder,
        ImpactTemplatesViewWordingType.TAB_Margin,
        ImpactTemplatesViewWordingType.TAB_Risk,
        ImpactTemplatesViewWordingType.TAB_Imbalanced
    ];

    const tabBetSlipSettingArray: ImpactTemplatesViewWordingType[] = [
        ImpactTemplatesViewWordingType.TAB_MarketControl,
        ImpactTemplatesViewWordingType.TAB_BetSlipRisks,
        ImpactTemplatesViewWordingType.TAB_BetSlip,
        ImpactTemplatesViewWordingType.TAB_Parlay,
        ImpactTemplatesViewWordingType.TAB_Alert,
        ImpactTemplatesViewWordingType.TAB_RapidBet,
        ImpactTemplatesViewWordingType.TAB_Settlement
    ];

    const tabMarketSettingArray: ImpactTemplatesViewWordingType[] = [
        ImpactTemplatesViewWordingType.TAB_Market
    ];

    const [filteredOldTemplates, setFilteredOldTemplates] = useState(oldTemplates)
    const templateTableName = useRef('')
    const tableProps = useRef<ContentTableProps>(
        {
            title: '',
            rows: undefined,
            markets: undefined,
            actions: [],
            columns: []
        }
    )

    const handleLeagueSearch = (value?: string) => {
        if (value && value !== '') {
            setFilteredOldTemplates(oldTemplates.filter(template => {
                return template.leagues?.some(league => league.leagueName.toLowerCase().includes(value.toLowerCase())) ?? false
            }))
        } else {
            setFilteredOldTemplates(oldTemplates)
        }
    }

    const gotoSettingPage = (isNew: boolean, rowIndex: number, cellIndex: number) => {
        const isLeague = cellIndex === 0;

        if (isLeague) {
            gotoLeagueSettingPage(isNew, rowIndex);
        } else {
            gotoMarketSettingPage(isNew, rowIndex);
        }
    };

    function gotoLeagueSettingPage(isNew: boolean, rowIndex: number) {
        const templateList = isNew ? newTemplates : filteredOldTemplates;
        const template = templateList[rowIndex];
        templateTableName.current = template.templateName;

        const rows = template.leagues?.map(league => ({
            id: league.leagueId,
            name: league.leagueName
        })) ?? [];

        const columns = LeagueTableColumns;

        tableProps.current = {
            title: 'League',
            rows,
            actions: [],
            columns
        };

        setIsTableOpen(true);
    }

    function gotoMarketSettingPage(isNew: boolean, rowIndex: number) {
        const templateList = isNew ? newTemplates : filteredOldTemplates;
        const template = templateList[rowIndex];
        templateTableName.current = template.templateName;
        tableProps.current = {
            title: 'Market Type',
            markets: template.marketSettings,
            actions: [],
        };

        setIsTableOpen(true);
    }

    return {
        tabGeneralSettingArray,
        tabBetSlipSettingArray,
        tabMarketSettingArray,
        newTemplates,
        filteredOldTemplates,
        handleSearch: handleLeagueSearch,
        onFinished,
        gotoSettingPage,
        isTableOpen,
        setIsTableOpen,
        tableProps,
        templateTableName
    }
}

export default useImpactTemplatesViewModel