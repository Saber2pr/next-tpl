import './style.less'

import { Affix, Layout, Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import classnames from 'classnames'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { Link } from '../../components'
import { pushGoTop } from '../../utils/goTop'
import { Menus } from './menus'
import { useRestoreSiderScroll } from '../../hooks'

const { Sider, Content, Header } = Layout
const SIDER_WIDTH = 260

export interface MainLayoutAdmin {
  children: React.ReactNode
  className?: string
  rootClassName?: string
  title?: string
}

export const MainLayoutAdmin = ({
  children,
  className,
  rootClassName,
  title = '标题',
}: MainLayoutAdmin) => {
  const router = useRouter()
  const [openKeys, pustOpenKeys] = useRestoreSiderScroll(
    '.MainLayoutAdmin-Sider'
  )
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
          openKeys={openKeys}
          defaultSelectedKeys={[router.pathname]}
          onOpenChange={keys => pustOpenKeys(keys as string[])}
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
        <Affix>
          <Header className="MainLayoutAdmin-Main-Header">{title}</Header>
        </Affix>
        <Content
          className={classnames('MainLayoutAdmin-Main-Content', className)}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
