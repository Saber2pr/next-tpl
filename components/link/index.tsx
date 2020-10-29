import { default as NextLink } from 'next/link'
import NProgress from 'nprogress'

export interface LinkProps {
  children: React.ReactNode
  className?: string
  target?: '_blank'
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  style?: React.CSSProperties
  href?: string
  scroll?: boolean
}

export const Link = ({
  children,
  className,
  href,
  target,
  onClick,
  style,
  scroll = true,
}: LinkProps) => {
  const preLoading = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    NProgress.start()
    // 新窗口就直接结束loading
    // 或没有href
    if (target === '_blank' || !href) {
      NProgress.done()
    }
    onClick && onClick(event)
  }

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a
          href={href}
          onClick={preLoading}
          target={target}
          style={style}
          className={className}
        >
          {children}
        </a>
      )
    } else {
      return (
        <NextLink href={href} passHref scroll={scroll}>
          <a
            onClick={preLoading}
            target={target}
            style={style}
            className={className}
          >
            {children}
          </a>
        </NextLink>
      )
    }
  } else {
    return (
      <a
        onClick={preLoading}
        target={target}
        style={style}
        className={className}
      >
        {children}
      </a>
    )
  }
}
