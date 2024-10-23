import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

const getTopics = async () => {
  const { data } = await axios.get('/api/topics');
  console.log(data);
  return { topics: data };
};

export const topicsQueryOptions = queryOptions({
  queryFn: () => getTopics(),
  queryKey: ['topics'],
});
