import { Topic } from '@/types'
import { useQuery } from '@tanstack/react-query'

const fetchTopics = async (): Promise<Topic[]> =>
  fetch(`api/topics`).then((res) => res.json())

export const useGetTopics = () => {
  const query = useQuery({ queryKey: ['topics'], queryFn: fetchTopics })

  return query
}
