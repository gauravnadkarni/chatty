type ThunkAPI = {
    dispatch: Function
    getState: Function
    extra?: any
    requestId: string
    signal: AbortSignal
}

export default ThunkAPI;