import useApiInteractor from "@/services/@core/ApiInteractor";
import {
    AddChannelProps,
    UpdateChannelProps,
    ChannelListProps,
    GetChannelDetailProps,
    RemoveChannelsProps,
    UpdateChannelStatusProps,
    GetConfigurationProps,
    UpdateConfigurationProps, GetAvailableOwnerProps
} from "@/services/@core/module/RequestDataModels";

const useChannelsRepository = () => {
    const apiInteractor = useApiInteractor()

    const addChannel = async (requestData: AddChannelProps) => {
        return await apiInteractor.addChannel(requestData)
    }

    const updateChannel = async (requestData: UpdateChannelProps) => {
        return await apiInteractor.updateChannel(requestData)
    }

    const getChannelList = async (requestData: ChannelListProps) => {
        return await apiInteractor.getChannelList(requestData)
    }

    const removeChannels = async (requestData: RemoveChannelsProps) => {
        return await apiInteractor.removeChannels(requestData)
    }

    const updateChannelStatus = async (requestData: UpdateChannelStatusProps) => {
        return await apiInteractor.updateChannelStatus(requestData)
    }

    const getChannelDetail = async (requestData: GetChannelDetailProps) => {
        return await apiInteractor.getChannelDetail(requestData)
    }

    const getConfiguration = async (requestData: GetConfigurationProps) => {
        return await apiInteractor.getChannelConfiguration(requestData)
    }

    const updateConfiguration = async (requestData: UpdateConfigurationProps) => {
        return await apiInteractor.updateChannelConfiguration(requestData)
    }

    const getAvailableOwners = async (requestData: GetAvailableOwnerProps) => {
        return await apiInteractor.getAvailableOwners(requestData)
    }

    return {
        addChannel,
        updateChannel,
        getChannelList,
        removeChannels,
        updateChannelStatus,
        getChannelDetail,
        getAvailableOwners,
        getConfiguration,
        updateConfiguration
    }
}

export default useChannelsRepository