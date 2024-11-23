import { api } from '@/lib/axios'

export interface GetDayOrdersAmountResponseInterface {
    amount: number
    diffFromYesterday: number
}

export interface GetMonthOrdersAmountResponseInterface {
    amount: number
    diffFromLastMonth: number
}

export interface GetMonthCanceledOrdersAmountResponseInterface {
    amount: number
    diffFromLastMonth: number
}

export interface GetMonthRevenueResponseInterface {
    receipt: number
    diffFromLastMonth: number
}

export type GetPopularProductsResponseInterface = {
    product: string
    amount: number
}[]

export interface GetDailyRevenueInPeriodQueryInterface {
    from?: Date
    to?: Date
}

export type GetDailyRevenueInPeriodResponseInterface = {
    date: string
    receipt: number
}[]

export async function getDayOrdersAmount() {
    const response = await api.get<GetDayOrdersAmountResponseInterface>(
        '/metrics/day-orders-amount',
    )

    return response.data
}

export async function getMonthOrdersAmount() {
    const response = await api.get<GetMonthOrdersAmountResponseInterface>(
        '/metrics/month-orders-amount',
    )

    return response.data
}

export async function getMonthCanceledOrdersAmount() {
    const response = await api.get<GetMonthCanceledOrdersAmountResponseInterface>(
        '/metrics/month-canceled-orders-amount',
    )

    return response.data
}

export async function getMonthRevenue() {
    const response = await api.get<GetMonthRevenueResponseInterface>('/metrics/month-receipt')

    return response.data
}

export async function getPopularProducts() {
    const response = await api.get<GetPopularProductsResponseInterface>('/metrics/popular-products')

    return response.data
}

export async function getDailyRevenueInPeriod({ from, to }: GetDailyRevenueInPeriodQueryInterface) {
    const response = await api.get<GetDailyRevenueInPeriodResponseInterface>(
        '/metrics/daily-receipt-in-period',
        {
            params: { from, to },
        },
    )

    return response.data
}
