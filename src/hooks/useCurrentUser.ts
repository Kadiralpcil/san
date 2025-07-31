import { useQuery, useQueryClient } from '@tanstack/react-query'
import { User } from '../types'

export const useCurrentUser = () => {
  const { data } = useQuery<User>({
    queryKey: ['currentUser'],
    enabled: false,
  });

  return data || null;
}

export const useSetUser = () => {
  const queryClient = useQueryClient()

  return (user: { name: string; permissions: string[] }) => {
    queryClient.setQueryData(['currentUser'], user)
  }
}