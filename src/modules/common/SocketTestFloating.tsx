import { useState } from 'react';
import {GlobalWebSocket} from "@/modules/common/GlobalWebSocket";
import {Stack} from "@mui/material";

const SocketTestFloating = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        console.log('Submitted:', message);
        GlobalWebSocket.getInstance().testSubscription(message.trim())
    };

    return (
        GlobalWebSocket.debug && <Stack alignItems={"flex-end"} sx={{
            position: 'absolute',
            right: 10,
            bottom: 10,
        }}>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message..."
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                Send
            </button>
        </Stack>
    );
};

export default SocketTestFloating;