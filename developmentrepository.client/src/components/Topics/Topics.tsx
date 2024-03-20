import { useGetDirectionsByTopic } from '@/hooks'
import { TopicData } from '@/types'
import { Collapse, List } from 'antd'
import { Link, useLoaderData } from 'react-router-dom'
import TopicAdd from './TopicsAdd'

export function Topics() {
  const { topics } = useLoaderData() as TopicData
  const directions = useGetDirectionsByTopic()

  const collapses = (directions.data ?? []).map((direction) => (
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
  ))

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        height: '100%',
      }}
    >
      <TopicAdd />
      <div
        style={{
          flex: 1,
          flexBasis: 1,

          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            flexBasis: 1,
            overflowY: 'auto',

            paddingLeft: '10px',
            paddingRight: '10px',
            gap: '10px',
          }}
        >
          {collapses}
        </div>
      </div>
    </div>
  )
}
