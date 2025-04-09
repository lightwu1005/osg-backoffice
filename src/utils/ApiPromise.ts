import {REQUEST_CANCELED} from "@/services/@core/ApiClient";

export class ApiPromise<T> extends Promise<T> {

    static from<T>(promise: Promise<T>): ApiPromise<T> {
        return new ApiPromise<T>((resolve, reject) => {
            promise.then(resolve).catch((error) => {
                    if (error !== REQUEST_CANCELED) {
                        reject(error);
                    }
                }
            );
        });
    }

}