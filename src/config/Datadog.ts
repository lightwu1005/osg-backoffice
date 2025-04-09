import { datadogLogs } from "@datadog/browser-logs";

export const initDatadogLogs = () => {
    if (!(window as any).__DATADOG_INITIALIZED__) {
        datadogLogs.init({
            clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN as string,
            site: process.env.NEXT_PUBLIC_DATADOG_SITE as 'datadoghq.com' | 'datadoghq.eu' | 'us3.datadoghq.com' | 'us5.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
            env: process.env.NEXT_PUBLIC_DATADOG_ENV as string,
            service: process.env.NEXT_PUBLIC_DATADOG_SERVICE as string,
        });
        (window as any).__DATADOG_INITIALIZED__ = true;
    }
}

export { datadogLogs };
