import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Permission } from '../navigation/routes'

export const USER_KEY = ['current-user']

export interface User {
  username: string
  permissions: Permission[]
}

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: USER_KEY,
    queryFn: () => null,
    staleTime: Infinity,
  })
}

export const useSetUser = () => {
  const queryClient = useQueryClient()

  return (user: { name: string; permissions: string[] }) => {
    queryClient.setQueryData(USER_KEY, user)
  }
}
