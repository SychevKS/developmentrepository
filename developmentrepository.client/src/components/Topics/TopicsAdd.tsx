import { useCreateTopic, useGetDirectionsByTopic } from '@/hooks'
import { Topic } from '@/types'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Form, Input, Select, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { Form as ReactRouterForm } from 'react-router-dom'

export default function TopicsAdd() {
  const {
    token: { borderRadiusLG },
  } = theme.useToken()
  const [form] = Form.useForm()

  const [newDirectionName, setNewDirectionName] = useState<string>('')
  const createTopic = useCreateTopic()
  const directions = useGetDirectionsByTopic()
  const [selectionItems, setSelectionItems] = useState<string[]>([])

  useEffect(() => {
    if (directions.data && selectionItems.length === 0) {
      setSelectionItems(directions.data)
    }
  }, [directions.data, selectionItems.length])

  const handleNewDirectionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewDirectionName(event.target.value)
  }
  const handleAddItemToSelect = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault()
    setSelectionItems([...selectionItems, newDirectionName])
    setNewDirectionName('')
  }
  const handleFinishAddTopic = (value: Topic) => {
    createTopic.mutate(value)
    form.resetFields()
  }

  return (
    <Flex
      gap="middle"
      style={{
        width: '100%',
        padding: '5px 6px',
        backgroundColor: '#f0f0f0',
        borderRadius: borderRadiusLG,
      }}
    >
      <ReactRouterForm method="post" >
        <Form
          form={form}
          name="basic"
          layout="inline"
          initialValues={{ remember: true }}
          autoComplete="off"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          onFinish={handleFinishAddTopic}
        >
          <Form.Item<Topic>
            name="name"
            rules={[{ required: true, message: '' }]}
            style={{ flexGrow: 2 }}
          >
            <Input placeholder="Название темы"  name="name" />
          </Form.Item>

          <Form.Item<Topic>
            name="direction"
            rules={[{ required: true, message: '' }]}
            style={{ flexGrow: 2 }}
          >
            <Select
              loading={directions.isLoading}
              style={{ width: '100%' }}
              placeholder="Направление"
              options={selectionItems.map((item: string) => ({
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
                        placeholder="Наименование направления"
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

          <Form.Item style={{ flexGrow: 0.5, marginRight: 0 }}>
            <Button htmlType="submit" style={{ width: '100%' }}>
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </ReactRouterForm>
    </Flex>
  )
}
