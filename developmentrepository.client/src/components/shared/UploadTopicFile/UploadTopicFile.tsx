import { UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Flex,
  Input,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  theme,
} from 'antd'
import React from 'react'

const { Text } = Typography

export function UploadTopicFile() {
  const {
    token: { borderRadiusLG },
  } = theme.useToken()
  const [fileName, setFileName] = React.useState<string>('')
  const [fileList, setFileList] = React.useState<UploadFile[]>([])

  const uploadProps: UploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      setFileName(file.name.split('.').slice(0, -1).join('.'))
      setFileList([file])

      const fr = new FileReader()
      fr.onload = function () {
        console.log(fr.result)
      }
      fr.readAsText(file)

      return false
    },
    fileList,
    maxCount: 1,
  }

  return (
    <Flex
      gap={10}
      vertical
      style={{
        padding: 10,
        borderRadius: borderRadiusLG,
      }}
    >
      <Text>Добавление файла заметки</Text>
      <Flex gap={10}>
        <Flex vertical gap={10} flex={1}>
          <Input
            placeholder="Заголовок заметки"
            value={fileName}
            onChange={(e) => setFileName(e.currentTarget.value)}
          />
          <Button type="primary" style={{ width: 150 }} size="small">
            Добавить файл
          </Button>
        </Flex>

        <Upload {...uploadProps} style={{ display: 'flex' }}>
          <Button icon={<UploadOutlined />}>Выбрать файл</Button>
        </Upload>
      </Flex>
    </Flex>
  )
}
