import { useGetDirectionsByTopic } from '@/hooks';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Form, Input, Modal, Select } from 'antd';
import React from 'react';

export function TopicsToolbarAddTopic() {
  const [isOpenModelAddingTopic, setIsOpenModelAddingTopic] =
    React.useState(false);
  const directions = useGetDirectionsByTopic();
  const [selectableDirections, setSelectableDirections] = React.useState<
    string[]
  >([]);
  //const submit = useSubmit();

  const [topicName, setTopicName] = React.useState('');
  const [selectDirection, setSelectDirection] = React.useState<string | null>(
    ''
  );
  const [newDirectionName, setNewDirectionName] = React.useState<string>('');

  React.useEffect(() => {
    if (directions.data && selectableDirections.length === 0) {
      setSelectableDirections(directions.data);
    }
  }, [directions.data, selectableDirections.length]);

  const handleAddingTopic = () => {
    setIsOpenModelAddingTopic(false);
  };

  const handleOpenModelAddingTopic = () => {
    setSelectableDirections(directions.data ?? []);
    setTopicName('');
    setSelectDirection(null);
    setNewDirectionName('');
    setIsOpenModelAddingTopic((prev) => !prev);
  };

  const handleNewDirectionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDirectionName(event.target.value);
  };
  const handleAddItemToSelect = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setSelectableDirections([...selectableDirections, newDirectionName]);
    setNewDirectionName('');
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={handleOpenModelAddingTopic}>
        Добавить тему
      </Button>

      <Modal
        title="Добавление темы"
        open={isOpenModelAddingTopic}
        onOk={handleAddingTopic}
        onCancel={handleOpenModelAddingTopic}
        footer={[]}
      >
        <Form onFinish={(values) => submit(values, { method: 'post' })}>
          <Flex vertical gap={10}>
            <Form.Item name="name">
              <Input
                placeholder="Название темы"
                value={topicName}
                onChange={(event) => setTopicName(event.currentTarget.value)}
                style={{ flex: 2 }}
              />
            </Form.Item>

            <Form.Item name="direction">
              <Select
                loading={directions.isLoading}
                style={{ flex: 1 }}
                placeholder="Направление"
                value={selectDirection}
                onChange={(value) => setSelectDirection(value)}
                options={selectableDirections.map((item: string) => ({
                  label: item,
                  value: item,
                }))}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Flex gap={10}>
                      <div style={{ flex: 6 }}>
                        <Input
                          placeholder="Название направления"
                          value={newDirectionName}
                          size="small"
                          onChange={handleNewDirectionNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                          style={{ flexGrow: 1 }}
                        />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <Button
                          disabled={newDirectionName === ''}
                          size="small"
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={handleAddItemToSelect}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </Flex>
                  </>
                )}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              onClick={handleOpenModelAddingTopic}
            >
              Добавить
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
