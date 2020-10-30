import './style.less'

import classnames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'

import { Link } from '../../components'

export interface MainHeader {}

type NavLink = {
  name: string
  href: string
}

const NavLinks: NavLink[] = [
  {
    name: '首页',
    href: '/',
  },
  {
    name: '文章',
    href: '/paras',
  },
]

export const MainHeader = ({}: MainHeader) => {
  const router = useRouter()
  const pathname = router.pathname
  return (
    <div className="MainHeader flex">
      <nav className="MainHeader-Nav">
        <ul className="NavList flex align-items-center">
          {NavLinks.map(({ name, href }) => {
            const isActive =
              href === '/' ? pathname === href : pathname.startsWith(href)
            return (
              <li
                key={href}
                className={classnames('NavList-Item', { active: isActive })}
              >
                <Link className="NavList-Item-Anchor" href={href}>
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="MainHeader-Right flex align-items-center">
        <div className="MainHeader-User"></div>
      </div>
    </div>
  )
}
