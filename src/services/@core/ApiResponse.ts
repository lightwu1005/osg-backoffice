export default interface ApiResponse<T> {
    isSuccess: boolean
    result: T
}