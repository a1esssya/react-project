/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query'
import api from '../api'
import { usePageContext } from '../components/Page'

export function useCardsGet() {
  const { isInitialized } = usePageContext()

  const getCards = async () => {
    const result = await api.get(`/targets/`)
    return result.data
  }

  return useQuery(['cards'], getCards, {
    enabled: isInitialized,
  })
}
