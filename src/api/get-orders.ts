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
}

export async function getOrders({ pageIndex }: GetOrdersQueryInterface) {
    const response = await api.get<GetOrdersResponseInterface>('/orders', {
        params: {
            pageIndex,
        },
    })

    return response.data
}
