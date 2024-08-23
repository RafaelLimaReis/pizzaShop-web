import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
    getManagedRestaurant,
    GetManagedRestaurantResponseInterface,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from '../ui/button'
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
})

type StoreProfileSchemaType = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
    const queryClient = useQueryClient()

    const { data: managedRestaurant } = useQuery({
        queryFn: getManagedRestaurant,
        queryKey: ['managed-restaurant'],
        staleTime: Infinity,
    })

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<StoreProfileSchemaType>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? '',
        },
    })

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onSuccess(_, { name, description }) {
            const cached = queryClient.getQueryData<GetManagedRestaurantResponseInterface>([
                'managed-restaurant',
            ])

            if (cached) {
                queryClient.setQueryData<GetManagedRestaurantResponseInterface>(
                    ['managed-restaurant'],
                    {
                        ...cached,
                        name,
                        description,
                    },
                )
            }
        },
    })

    async function handleUpdateProfile(data: StoreProfileSchemaType) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description,
            })

            toast.success('Perfil atualizado com sucesso!')
        } catch {
            toast.error('Falha ao atualizar perfil, tente novamente.')
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visìveis ao seu cliente
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome
                        </Label>
                        <Input className="col-span-3" id="name" {...register('name')} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descrição
                        </Label>
                        <Textarea
                            className="col-span-3"
                            id="description"
                            {...register('description')}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost" type="button">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button disabled={isSubmitting} type="submit" variant="success">
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
