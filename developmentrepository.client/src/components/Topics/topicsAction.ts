/* import { Topic } from '@/types';

const addTopic = async (topic: Topic) =>
  await fetch('/api/topics', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topic),
  }).then((res) => res.json());

export async function topicsAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const topic: Topic = Object.fromEntries(formData) as unknown as Topic;

  await addTopic(topic);

  return redirect(`/`);
}
 */
