import { CloudUploadOutlined } from '@ant-design/icons'

type Menus = {
  name: string
  href?: string
  icon: React.ReactNode
  children?: Omit<Menus[0], 'children'>[]
}[]

export const Menus: Menus = [
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
