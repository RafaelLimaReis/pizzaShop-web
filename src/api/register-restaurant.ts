import { api } from '@/lib/axios'

export interface RegisterRestaurantBodyInterface {
    restaurantName: string
    managerName: string
    email: string
    phone: string
}

export async function registerRestaurant({
    email,
    managerName,
    phone,
    restaurantName,
}: RegisterRestaurantBodyInterface) {
    await api.post('/restaurants', {
        email,
        managerName,
        phone,
        restaurantName,
    })
}
