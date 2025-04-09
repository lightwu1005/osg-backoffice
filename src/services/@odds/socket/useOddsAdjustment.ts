import {GlobalWebSocket, SocketEvent} from "@/modules/common/GlobalWebSocket";
import {useEffect} from "react";

export interface OddsAdjustmentProps {
    eventType: string
    betId: string
    price: number
    originalPrice: number
}
const useOddsAdjustment = () => {
    const globalWebsocket = GlobalWebSocket.getInstance();

    const adjustment = (props: OddsAdjustmentProps) => {
        globalWebsocket.send(SocketEvent.ODDS_ADJUSTMENT, JSON.stringify(props));
    }

    useEffect(() => {
        const socketHandler = {
            key: () => SocketEvent.ODDS_ADJUSTMENT,
            receive: () => {},
            close: () => {},
            resendWithReconnect: () => false,
            resendMessage: () => undefined
        }
        globalWebsocket.subscribe(socketHandler);
        return () => {
            globalWebsocket.unsubscribe(socketHandler);
        }
    }, []);

    return {
        adjustment
    }
}

export default useOddsAdjustment