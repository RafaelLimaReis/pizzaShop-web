import { api } from '@/lib/axios'

interface UpdateProfileBodyInterface {
    name: string
    description: string | null
}

export async function updateProfile({ name, description }: UpdateProfileBodyInterface) {
    await api.put('/profile', { name, description })
}
