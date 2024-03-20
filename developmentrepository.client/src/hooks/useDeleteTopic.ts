import { Topic } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

const fetchCreateTopic = async (id: string): Promise<Topic> =>
  fetch(`api/topics/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

export const useDeleteTopic = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Topic, Error, string>({
    mutationFn: fetchCreateTopic,
    onSuccess: () => {
      message.success('Тема удалена')
      queryClient.invalidateQueries({ queryKey: ['topics'] })
    },
    onError: () => message.error('Ошибка при добавление темы'),
  })

  return mutation
}
