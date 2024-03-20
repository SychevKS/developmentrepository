import { Topic } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

const fetchCreateTopic = async (topic: Topic): Promise<Topic> =>
  fetch(`api/topics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topic),
  }).then((res) => res.json())

export const useCreateTopic = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<Topic, Error, Topic>({
    mutationFn: fetchCreateTopic,
    onSuccess: () => {
      message.success('Тема добавлена')
      queryClient.invalidateQueries({ queryKey: ['topics'] })
    },
    onError: () => message.error('Ошибка при добавление темы'),
  })

  return mutation
}
