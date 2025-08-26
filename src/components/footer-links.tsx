'use client'

import React from 'react'

const FooterLinks = () => {
  return (
    <div className='flex flex-col items-center space-y-2 md:items-start'>
      <div
        onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className='hover:underline'
      >
        Home
      </div>
      <div
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className='hover:underline'
      >
        Projects
      </div>
      <div
        onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className='hover:underline'
      >
        Team
      </div>
      <div
        onClick={() => document.getElementById('board')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className='hover:underline'
      >
        Board
      </div>
      <div
        onClick={() => document.getElementById('supporters')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className='hover:underline'
      >
        Supporters
      </div>
      <div
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className='hover:underline'
      >
        Contact
      </div>
    </div>
  )
}

export default FooterLinks
