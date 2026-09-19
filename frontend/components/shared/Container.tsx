'use client'

import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className = ''
}) => {
  const maxWidthStyles = {
    sm: 'max-w-[640px]',
    md: 'max-w-[768px]',
    lg: 'max-w-[1024px]',
    xl: 'max-w-[1280px]',
    '2xl': 'max-w-[1440px]',
    full: 'max-w-full'
  }

  const paddingStyles = {
    none: '',
    sm: 'px-[var(--padding-sm)]',
    md: 'px-[var(--padding-md)]',
    lg: 'px-[var(--padding-lg)]'
  }

  return (
    <div
      className={`${maxWidthStyles[maxWidth]} ${paddingStyles[padding]} mx-auto w-full ${className}`}
    >
      {children}
    </div>
  )
}

export default Container
