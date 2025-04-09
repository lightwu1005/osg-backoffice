import {RequestConfig, Method, RequestBuilder} from "./RequestBuilder";
describe('RequestBuilder', () => {
    it('should create a RequestBuilder instance with default headers', () => {
        const config: RequestConfig = {
            baseURL: 'https://example.com',
            method: Method.get,
            url: '/api/data',
        };

        const requestBuilder = new RequestBuilder(config);

        expect(requestBuilder).toBeDefined();
        expect(requestBuilder.axiosConfig).toEqual({
            baseURL: 'https://example.com',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            params: undefined,
            data: undefined,
            url: '/api/data',
        });
    });
});
