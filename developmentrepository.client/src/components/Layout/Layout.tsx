import { FileTextOutlined } from '@ant-design/icons';
import { Link, Outlet } from '@tanstack/react-router';
import { Layout as BaseLayout, Menu } from 'antd';
import React, { useState } from 'react';

const { Content, Sider } = BaseLayout;

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);

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
              icon: React.createElement(FileTextOutlined),
              label: (
                <Link to={'/'} activeOptions={{ exact: true }}>
                  Темы
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <BaseLayout>
        <Content
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '25px 50px',
          }}
        >
          <Outlet />
        </Content>
      </BaseLayout>
    </BaseLayout>
  );
}
