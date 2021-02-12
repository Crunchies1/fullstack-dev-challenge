import axios, { AxiosRequestConfig } from 'axios'

// Request Method Helper Functions
const get = (url: string) => getWithHeaders(url, {})
const post = (url: string, data: unknown) => postWithHeaders(url, data, {})
const getWithHeaders = (url: string, headers: AxiosRequestConfig) => axios.get(url, headers)
const postWithHeaders = (url: string, data: unknown, headers: AxiosRequestConfig) =>
    axios.post(url, data, headers)

// Internal Helper Functions
export const getProjection = async (
    initialSavings: string,
    monthlyDepo: string,
    interest: number,
    period: React.ReactText,
    custom: string
) =>
    (
        await post('http://localhost:3001/', {
            initialSavings: initialSavings,
            monthlyDepo: monthlyDepo,
            interest: interest,
            period: period,
            custom: custom,
        })
    ).data
