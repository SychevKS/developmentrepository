import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex, Input, Select } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import React from 'react';
import { TopicsToolbarAddTopic } from './TopicsToolbarAddTopic';

const { Search } = Input;

const sortingFields: { value: string; label: string }[] = [
  { value: 'dateAdded', label: 'Дата добавления' },
  { value: 'name', label: 'Заголовок' },
  { value: 'direction', label: 'Направление' },
];

export function TopicsToolbar() {
  const [sortingDirection, setSortingDirection] = React.useState('desc');

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <Flex gap={10}>
      <TopicsToolbarAddTopic />

      <Divider type="vertical" style={{ height: '100%' }} />
      <Search placeholder="Поиск тем..." onSearch={onSearch} enterButton />

      <Select
        placeholder=""
        defaultValue={'dateAdded'}
        options={sortingFields}
      />
      <Button
        type="primary"
        shape="circle"
        icon={
          sortingDirection === 'desc' ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )
        }
        onClick={() =>
          setSortingDirection(sortingDirection === 'asc' ? 'desc' : 'asc')
        }
      />
    </Flex>
  );
}
