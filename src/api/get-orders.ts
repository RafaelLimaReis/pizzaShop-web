import { api } from '@/lib/axios'

export interface GetOrdersResponseInterface {
    orders: {
        orderId: string
        createdAt: string
        status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
        customerName: string
        total: number
    }[]
    meta: {
        pageIndex: number
        perPage: number
        totalCount: number
    }
}

export interface GetOrdersQueryInterface {
    pageIndex?: number | null
    orderId?: string | null
    status?: string | null
    customerName?: string | null
}

export async function getOrders({
    pageIndex,
    orderId,
    status,
    customerName,
}: GetOrdersQueryInterface) {
    const response = await api.get<GetOrdersResponseInterface>('/orders', {
        params: {
            pageIndex,
            orderId,
            status,
            customerName,
        },
    })

    return response.data
}
