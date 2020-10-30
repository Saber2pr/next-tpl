import './style.less'

import classnames from 'classnames'
import React, { ReactNode } from 'react'
import { MainHeader } from '../main-header'
import { MainFooter } from '../main-footer'
import Head from 'next/head'

export interface MainLayout {
  className?: string
  children: ReactNode
  title?: string
}

export const MainLayout = ({
  className,
  children,
  title = '标题',
}: MainLayout) => {
  return (
    <div className={classnames('MainLayout', className)}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="MainLayout-Header">
        <MainHeader />
      </div>
      <main className="MainLayout-Main">
        <div className="MainContent">{children}</div>
      </main>
      <div className="MainLayout-Footer">
        <MainFooter />
      </div>
    </div>
  )
}
