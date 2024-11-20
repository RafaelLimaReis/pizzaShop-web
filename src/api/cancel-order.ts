import { api } from '@/lib/axios'

export interface CancelOrderParamsInterface {
    orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderParamsInterface) {
    await api.patch(`/orders/${orderId}/cancel`)
}
