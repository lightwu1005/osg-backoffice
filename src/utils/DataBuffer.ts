import { datadogLogs } from "@/config/Datadog";
export class DataBuffer<T> {
    private buffer: T[] = [];
    private intervalId: NodeJS.Timeout | null = null;
    private readonly bufferLock = new AsyncLock();

    constructor(
        public merge: (newData: T, buffer: T[]) => T[],
        public emitCallback: (mergedData: T[]) => void,
        public emitInterval: number
    ) {}

    async addData(newData: T) {
        await this.bufferLock.acquire('buffer', async () => {
            if (this.buffer && this.buffer.length > 0) {
                this.buffer = this.merge(newData, this.buffer);
            } else {
                this.buffer = [newData];
            }
        });

        if (!this.intervalId) {
            await this.startEmitTimer();
        }
    }

    private async startEmitTimer() {
        await this.bufferLock.acquire('timer', () => {
            if (this.intervalId) return;
            
            this.intervalId = setInterval(async () => {
                await this.processBuffer();
            }, this.emitInterval);
        });
    }

    private async processBuffer() {
        await this.bufferLock.acquire('buffer', async () => {
            if (this.buffer.length > 0) {
                const lastBuffer = [...this.buffer];
                this.buffer = [];
                try {
                    this.emitCallback(lastBuffer);
                } catch (error) {
                    console.error('Error in emit callback:', error);
                    datadogLogs.logger.error('Error in emit callback', {}, error instanceof Error ? error : new Error(String(error)));
                    this.buffer = [...lastBuffer, ...this.buffer];
                }
            } else {
                await this.stopEmitTimer();
            }
        });
    }

    private async stopEmitTimer() {
        await this.bufferLock.acquire('timer', () => {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        });
    }
}

class AsyncLock {
    private readonly locks: Map<string, Promise<void>> = new Map();

    async acquire(key: string, fn: () => Promise<void> | void): Promise<void> {
        while (this.locks.has(key)) {
            await this.locks.get(key);
        }

        let resolve: () => void;
        const promise = new Promise<void>(r => resolve = r);
        this.locks.set(key, promise);

        try {
            await fn();
        } finally {
            this.locks.delete(key);
            resolve!();
        }
    }
}