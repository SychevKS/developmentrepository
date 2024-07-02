import { useGetDirectionsByTopic } from '@/hooks';
import { topicsQueryOptions } from '@/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, List } from 'antd';
import { TopicsToolbar } from './TopicsToolbar';

export function Topics() {
  const { data: topics } = useSuspenseQuery(topicsQueryOptions);

  const directions = useGetDirectionsByTopic();

  /* const collapses = (directions.data ?? []).map((direction) => (
    <Collapse
      key={direction}
      items={[
        {
          key: direction,
          label: direction,
          children: (
            <List
              itemLayout="horizontal"
              dataSource={(topics ?? []).filter(
                (x) => x.direction === direction
              )}
              renderItem={(topic) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Link to={`topics/${topic.id}`}>{topic.name}</Link>}
                  />
                </List.Item>
              )}
            />
          ),
        },
      ]}
    />
  )); */

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
      }}
    >
      <Flex
        vertical
        gap={30}
        style={{
          flex: 1,
          flexBasis: 1,
        }}
      >
        <TopicsToolbar />
        <Flex style={{ flex: 1, width: '100%' }}>
          <List
            size="large"
            bordered
            itemLayout="horizontal"
            dataSource={directions.data}
            renderItem={(direction) => (
              <List.Item>
                <List.Item.Meta title={direction} />
              </List.Item>
            )}
            style={{ width: '100%' }}
          />
        </Flex>
      </Flex>
    </div>
  );
}
