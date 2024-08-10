import { api } from '@/lib/axios'

export interface SignInBodyInterface {
    email: string
}

export async function signIn({ email }: SignInBodyInterface) {
    await api.post('/authenticate', { email })
}
