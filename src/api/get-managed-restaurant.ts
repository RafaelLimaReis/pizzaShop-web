import { api } from '@/lib/axios'

interface GetManagedRestaurantResponseInterface {
    id: string
    name: string
    createdAt: Date | null
    updatedAt: Date | null
    description: string
    managerId: string | null
}

export async function getManagedRestaurant() {
    const response = await api.get<GetManagedRestaurantResponseInterface>('/managed-restaurant')

    return response.data
}
