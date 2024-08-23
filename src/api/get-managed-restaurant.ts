import { api } from '@/lib/axios'

export interface GetManagedRestaurantResponseInterface {
    id: string
    name: string
    createdAt: Date | null
    updatedAt: Date | null
    description: string | null
    managerId: string | null
}

export async function getManagedRestaurant() {
    const response = await api.get<GetManagedRestaurantResponseInterface>('/managed-restaurant')

    return response.data
}
