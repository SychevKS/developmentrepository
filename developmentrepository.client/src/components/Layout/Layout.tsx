import { UserOutlined } from '@ant-design/icons'
import { Layout as BaseLayout, Menu, theme } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const { Content, Sider } = BaseLayout

export function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <BaseLayout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={[
            {
              key: 1,
              icon: React.createElement(UserOutlined),
              label: `Темы`,
            },
          ]}
        />
      </Sider>
      <BaseLayout>
        <Content
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '20px',
            marginLeft: '45px',
            padding: '10px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </BaseLayout>
    </BaseLayout>
  )
}
