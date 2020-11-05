import './style.less'

import { Layout, Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import classnames from 'classnames'
import Head from 'next/head'
import React from 'react'

import { CloudUploadOutlined } from '@ant-design/icons'

import { Link } from '../../components'
import { pushGoTop } from '../../utils/goTop'
import { useRouter } from 'next/router'

const { Sider, Content, Header } = Layout
const SIDER_WIDTH = 260

export interface MainLayoutAdmin {
  children: React.ReactNode
  className?: string
  rootClassName?: string
  title?: string
}

type Menus = {
  name: string
  href?: string
  icon: React.ReactNode
  children?: Omit<Menus[0], 'children'>[]
}[]

const Menus: Menus = [
  {
    name: '上传服务1',
    icon: <CloudUploadOutlined />,
    href: '/upload',
    children: [
      {
        name: '文件上传11',
        href: '/upload/paras1',
        icon: <CloudUploadOutlined />,
      },
      {
        name: '文件上传12',
        href: '/upload/paras2',
        icon: <CloudUploadOutlined />,
      },
    ],
  },
  {
    name: '上传服务2',
    icon: <CloudUploadOutlined />,
    href: '/upload2',
    children: [
      {
        name: '文件上传',
        href: '/upload2/paras1',
        icon: <CloudUploadOutlined />,
      },
      {
        name: '文件上传',
        href: '/upload2/paras2',
        icon: <CloudUploadOutlined />,
      },
    ],
  },
]

export const MainLayoutAdmin = ({
  children,
  className,
  rootClassName,
  title = '标题',
}: MainLayoutAdmin) => {
  const router = useRouter()
  return (
    <Layout className={classnames('MainLayoutAdmin', rootClassName)}>
      <Head>
        <title>{title}</title>
      </Head>
      <Sider
        className="MainLayoutAdmin-Sider"
        width={SIDER_WIDTH}
        trigger={null}
        collapsible={false}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Link className="MainLayoutAdmin-Sider-Logo" href="/">
          Admin
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={Menus.map(item => item?.href)}
          defaultSelectedKeys={[router.pathname]}
        >
          {Menus.map(({ name, href, icon, children }) => {
            if (children) {
              return (
                <SubMenu key={href} title={name} icon={icon}>
                  {children.map(({ name, href, icon }) => (
                    <Menu.Item
                      key={href}
                      icon={icon}
                      onClick={() => pushGoTop(href)}
                    >
                      {name}
                    </Menu.Item>
                  ))}
                </SubMenu>
              )
            }
            return (
              <Menu.Item key={href} icon={icon} onClick={() => pushGoTop(href)}>
                {name}
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      <Layout
        className="MainLayoutAdmin-Main"
        style={{ paddingLeft: SIDER_WIDTH }}
      >
        <Header className="MainLayoutAdmin-Main-Header">{title}</Header>
        <Content
          className={classnames('MainLayoutAdmin-Main-Content', className)}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
