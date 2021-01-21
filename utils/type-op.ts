import type React from 'react'

export type GetProps<T> = T extends React.FC<infer R> ? R : never
