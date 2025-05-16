'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { cn } from '#/lib/utilities'
import ArrowUp from 'public/assets/icons/ui/arrow-up.svg'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    const handleWindowScroll = () => {
      setIsVisible(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleWindowScroll, { signal: abortController.signal })

    return () => abortController.abort()
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={cn(
        'fixed right-2 bottom-2 z-[9999] transition-all transition-discrete sm:right-4 sm:bottom-4',
        isVisible ? 'block opacity-100 starting:opacity-0' : 'hidden opacity-0 starting:opacity-100'
      )}
    >
      <button
        onClick={handleBackToTop}
        className='bg-neutral hover:bg-nav-item shadow-medium flex w-fit items-center gap-2 rounded-sm p-3 text-sm font-semibold transition-all sm:px-5 sm:py-4'
      >
        <p className='hidden sm:block'>Back to top</p>
        <Image src={ArrowUp} alt='Back to top' width={20} height={20} className='h-auto w-5' />
      </button>
    </div>
  )
}

export default BackToTop
