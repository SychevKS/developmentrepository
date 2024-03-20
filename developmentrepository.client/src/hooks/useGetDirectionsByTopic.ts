import { useQuery } from '@tanstack/react-query'

const fetchTopics = async (): Promise<string[]> =>
  fetch(`api/topics/directions`).then((res) => res.json())

export const useGetDirectionsByTopic = () => {
  const query = useQuery({
    queryKey: ['topics', 'directions'],
    queryFn: fetchTopics,
  })

  return query
}
