// useNavigation.ts
import { useNavigate } from 'react-router-dom'
import nav, { setNavigate, Nav } from '../navigation/nav'
import { useEffect } from 'react'

export const useNavigation = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return {
    nav: nav as Nav,
  }
}