import { api } from '@/lib/axios'

export interface DeliverOrderParamsInterface {
    orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderParamsInterface) {
    await api.patch(`/orders/${orderId}/deliver`)
}
