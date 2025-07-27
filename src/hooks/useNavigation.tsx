// src/hooks/useNav.ts

import { useNavigate } from 'react-router-dom'
import { nav } from '../navigation/nav'

export const useNav = () => {
  const navigate = useNavigate()

  return {
    go: (target: ReturnType<typeof nav[keyof typeof nav]['go']>) => {
      navigate(target.pathname)
    },
    nav, // eğer sadece path almak istersen
  }
}
