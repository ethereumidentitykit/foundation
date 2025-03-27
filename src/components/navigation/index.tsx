'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = ['home', 'projects', 'team', 'board', 'supporters', 'contact']
    const visibleSections = new Map()

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0.1, 0.4],
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        visibleSections.set(entry.target.id, {
          visible: entry.isIntersecting,
          ratio: entry.intersectionRatio,
        })

        let maxRatio = 0
        let currentSection = ''

        visibleSections.forEach((data, section) => {
          if (data.visible && data.ratio > maxRatio) {
            maxRatio = data.ratio
            currentSection = section
          }
        })

        if (currentSection) {
          setActiveSection(currentSection)
        } else if ([...visibleSections.values()].every((data) => !data.visible)) {
          setActiveSection('')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) {
        observer.observe(element)
        visibleSections.set(section, { visible: false, ratio: 0 })
      }
    })

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const NavLink = ({ href, section, children }: { href: string; section: string; children: React.ReactNode }) => {
    const isActive = activeSection === section || (section === 'home' && activeSection === 'home')

    return (
      <a
        href={href}
        className={`hover:text-gray-600 ${isActive ? 'font-bold' : 'font-normal'}`}
        onClick={section !== '' ? () => setMenuOpen(false) : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <header className='fixed top-0 left-0 z-[9999] flex w-full items-center justify-end bg-white/50 p-5 backdrop-blur-md md:justify-center md:p-8'>
        <Link href='#' className='absolute top-4 left-4 md:top-5'>
          <Image
            src='/assets/logo-full-dark.svg'
            alt='Ethereum Identity Foundation'
            width={140}
            height={100}
            className='h-auto w-[110px] md:w-[140px]'
          />
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden space-x-6 md:flex'>
          <NavLink href='#home' section='home'>
            Home
          </NavLink>
          <NavLink href='#projects' section='projects'>
            Projects
          </NavLink>
          <NavLink href='#team' section='team'>
            Team
          </NavLink>
          <NavLink href='#board' section='board'>
            Board
          </NavLink>
          <NavLink href='#supporters' section='supporters'>
            Supporters
          </NavLink>
          <NavLink href='#contact' section='contact'>
            Contact
          </NavLink>
        </nav>

        {/* Hamburger Button */}
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

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-[9999] h-full w-full transform bg-white transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} z-50 md:hidden`}
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
          <NavLink href='#' section=''>
            Home
          </NavLink>
          <NavLink href='#projects' section='projects'>
            Projects
          </NavLink>
          <NavLink href='#team' section='team'>
            Team
          </NavLink>
          <NavLink href='#board' section='board'>
            Board
          </NavLink>
          <NavLink href='#supporters' section='supporters'>
            Supporters
          </NavLink>
          <NavLink href='#contact' section='contact'>
            Contact
          </NavLink>
        </nav>
      </div>
    </>
  )
}

export default Navigation
