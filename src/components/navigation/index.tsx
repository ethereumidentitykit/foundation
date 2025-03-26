'use client'

import Image from 'next/image'
import { useState } from 'react'

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className='flex w-full items-center justify-end p-5 md:justify-center md:p-8'>
        <Image
          src='/assets/logo-full-dark.svg'
          alt='Ethereum Identity Foundation'
          width={130}
          height={100}
          className='absolute top-4 left-4'
        />

        {/* Desktop Nav */}
        <nav className='hidden space-x-6 md:flex'>
          <a href='#' className='hover:text-gray-600'>
            Home
          </a>
          <a href='#projects' className='hover:text-gray-600'>
            Projects
          </a>
          <a href='#team' className='hover:text-gray-600'>
            Team
          </a>
          <a href='#board' className='hover:text-gray-600'>
            Board
          </a>
          <a href='#supporters' className='hover:text-gray-600'>
            Supporters
          </a>
          <a href='#contact' className='hover:text-gray-600'>
            Contact
          </a>
        </nav>

        {/* Hamburger Button (Mobile) */}
        <button className='focus:outline-none md:hidden' onClick={() => setMenuOpen(true)} aria-label='Open menu'>
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full transform bg-white transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} z-50 md:hidden`}
      >
        <div className='flex items-center justify-between border-b p-4'>
          <span className='text-2xl font-light'>Menu</span>
          <button className='focus:outline-none' onClick={() => setMenuOpen(false)} aria-label='Close menu'>
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <nav className='mt-8 flex flex-col space-y-8 px-4 text-4xl font-light'>
          <a href='#' className='hover:text-gray-600' onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href='#projects' className='hover:text-gray-600' onClick={() => setMenuOpen(false)}>
            Projects
          </a>
          <a href='#team' className='hover:text-gray-600' onClick={() => setMenuOpen(false)}>
            Team
          </a>
          <a href='#board' className='hover:text-gray-600' onClick={() => setMenuOpen(false)}>
            Board
          </a>
          <a href='#supporters' className='hover:text-gray-600' onClick={() => setMenuOpen(false)}>
            Supporters
          </a>
          <a href='#contact' className='hover:text-gray-600' onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </>
  )
}

export default Navigation
