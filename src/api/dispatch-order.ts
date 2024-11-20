import { api } from '@/lib/axios'

export interface DispatchOrderParamsInterface {
    orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrderParamsInterface) {
    await api.patch(`/orders/${orderId}/dispatch`)
}
