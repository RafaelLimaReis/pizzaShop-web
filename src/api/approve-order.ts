import { api } from '@/lib/axios'

export interface ApproveOrderParamsInterface {
    orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderParamsInterface) {
    await api.patch(`/orders/${orderId}/approve`)
}
