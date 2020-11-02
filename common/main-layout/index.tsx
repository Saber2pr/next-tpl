import './style.less'

import classnames from 'classnames'
import React, { ReactNode } from 'react'
import { MainHeader } from '../main-header'
import { MainFooter } from '../main-footer'
import Head from 'next/head'

export interface MainLayout {
  rootClassName?: string
  className?: string
  children: ReactNode
  title?: string
}

export const MainLayout = ({
  className,
  rootClassName,
  children,
  title = '标题',
}: MainLayout) => {
  return (
    <div className={classnames('MainLayout', rootClassName)}>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="MainLayout-Header">
        <MainHeader />
      </div>
      <main className="MainLayout-Main">
        <div className={classnames('MainContent', className)}>{children}</div>
      </main>
      <div className="MainLayout-Footer">
        <MainFooter />
      </div>
    </div>
  )
}
