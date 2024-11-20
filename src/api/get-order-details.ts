import { api } from '@/lib/axios'

export interface GetOrderDetailsParamsInterface {
    orderId: string
}

export interface GetOrderDetailsResponseInterface {
    id: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    totalInCents: number
    customer: {
        name: string
        email: string
        phone: string | null
    }
    orderItems: {
        id: string
        priceInCents: number
        quantity: number
        product: {
            name: string
        }
    }[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParamsInterface) {
    const response = await api.get<GetOrderDetailsResponseInterface>(`/orders/${orderId}`)

    return response.data
}
