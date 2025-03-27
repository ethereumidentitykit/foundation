import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import BackToTop from '#/components/back-to-top'
import Navigation from '#/components/navigation'
import UserProfile from '#/components/user-profile'
import UserProfileCard from '#/components/user-profile-card'
import { FOUNDATION_ADDRESSES, FOUNDATION_ROLES, TEAM_ADDRESSES, TEAM_ROLES } from '#/lib/constants/team'

export const metadata: Metadata = {
  title: 'Ethereum Identity Foundation',
  openGraph: {
    title: 'Ethereum Identity Foundation',
    siteName: 'Ethereum Identity Foundation',
    description: 'Social graph for Ethereum',
    url: 'https://efp.app',
    images: [
      {
        url: 'https://efp.app/assets/banners/home.png',
      },
    ],
  },
  twitter: {
    images: 'https://efp.app/assets/banners/home.png',
  },
}

const HomePage = () => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center font-light text-gray-800'>
      <Navigation />
      <main className='w-full flex-grow'>
        {/* Home Section */}
        <section
          id='home'
          className='flex min-h-screen w-full flex-col items-center justify-center gap-12 px-4 py-28 pb-20 text-center sm:px-0 lg:py-28'
        >
          <h1 className='mb-4 text-3xl md:text-6xl'>Ethereum Identity Foundation</h1>
          <p className='mx-auto text-lg md:text-xl'>
            We&apos;re bringing identity onchain with the Ethereum identity stack.
          </p>
        </section>

        {/* Projects Section */}
        <section id='projects' className='w-full py-20 lg:py-28'>
          <div className='flex w-full flex-col items-center gap-12 lg:gap-18'>
            <h2 className='text-5xl'>Projects</h2>
            <div className='grid w-full grid-cols-1 md:grid-cols-2'>
              <Link
                href='https://ethidentitykit.com'
                target='_blank'
                className='group relative flex h-[60vw] w-full flex-col items-start justify-end gap-2 overflow-hidden bg-white p-4 sm:p-6 md:h-[30vw] lg:gap-4 lg:p-8'
              >
                <Image
                  src='/assets/art/eik-project.png'
                  alt='Ethereum Identity Kit'
                  width={2000}
                  height={1200}
                  className='absolute top-0 left-0 z-0 h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <h3 className='z-20 text-2xl text-white group-hover:underline lg:text-3xl xl:text-4xl'>
                  Ethereum Identity Kit
                </h3>
                <p className='z-20 text-base font-light text-white lg:text-lg'>
                  Component library to easily integrate ENS, EFP, and other elements of the Ethereum identity stack.
                </p>
              </Link>
              <Link
                href='https://efp.app'
                target='_blank'
                className='group relative flex h-[60vw] w-full flex-col items-start justify-end gap-2 overflow-hidden bg-white p-4 sm:p-6 md:h-[30vw] lg:gap-4 lg:p-8'
              >
                <Image
                  src='/assets/art/efp-project.png'
                  alt='Ethereum Follow Protocol'
                  width={2000}
                  height={1200}
                  className='absolute top-0 left-0 z-0 h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <h3 className='z-20 text-2xl group-hover:underline lg:text-3xl xl:text-4xl'>
                  Ethereum Follow Protocol
                </h3>
                <p className='z-20 text-base font-light lg:text-lg'>
                  Onchain social graph protocol for Ethereum accounts that complements ENS
                </p>
              </Link>
              <Link
                href='https://github.com/ethereumidentitykit/ENS-Worker'
                target='_blank'
                className='group relative flex h-[60vw] w-full flex-col items-start justify-end gap-2 overflow-hidden bg-white p-4 sm:p-6 md:h-[30vw] lg:gap-4 lg:p-8'
              >
                <Image
                  src='/assets/art/ens-worker-project.png'
                  alt='ENS Worker'
                  width={2000}
                  height={1200}
                  className='absolute top-0 left-0 z-0 h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <h3 className='z-20 text-2xl group-hover:underline lg:text-3xl xl:text-4xl'>ENS Worker</h3>
                <p className='z-20 text-base font-light lg:text-lg'>
                  High performance bulk lookups of ENS names and profile data for apps, easily spin up your own instance
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id='team' className='w-full px-4 py-20 md:px-0 lg:py-28'>
          <div className='flex w-full flex-col items-center gap-12 lg:gap-18'>
            <h2 className='text-5xl'>Team</h2>
            <div className='w-full gap-8 font-sans md:gap-0'>
              {TEAM_ADDRESSES.map((address, index) => (
                <div key={address} className='flex w-full flex-col items-center gap-8'>
                  <div className='flex w-full flex-col items-center gap-4 md:hidden'>
                    <p className='font-roboto-serif text-2xl'>{TEAM_ROLES[index]}</p>
                    <UserProfileCard className='z-50 flex w-full shadow-md' address={address as `0x${string}`} />
                  </div>
                  <UserProfile
                    address={address as `0x${string}`}
                    role={TEAM_ROLES[index]}
                    className='hidden w-full md:block'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board Section */}
        <section id='board' className='px-4 py-20 md:px-0 lg:py-28'>
          <div className='flex w-full flex-col items-center gap-12 lg:gap-18'>
            <h2 className='text-5xl'>Board</h2>
            <div className='w-full gap-8 font-sans md:gap-0'>
              {FOUNDATION_ADDRESSES.map((address, index) => (
                <div key={address} className='flex w-full flex-col items-center gap-8'>
                  <div className='flex w-full flex-col items-center gap-4 md:hidden'>
                    <p className='font-roboto-serif text-2xl'>{FOUNDATION_ROLES[index]}</p>
                    <UserProfileCard className='z-50 flex w-full shadow-md' address={address as `0x${string}`} />
                  </div>
                  <UserProfile
                    address={address as `0x${string}`}
                    role={FOUNDATION_ROLES[index]}
                    className='hidden w-full md:block'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  Supporter (Sponsors) Section */}
        <section id='supporters' className='px-4 py-20 sm:px-0 lg:py-28'>
          <div className='flex w-full flex-col items-center gap-20'>
            <h2 className='text-5xl'>Supporters</h2>
            <div className='flex flex-wrap items-center justify-center gap-20'>
              <Link
                className='flex h-fit items-center justify-center transition-transform hover:-rotate-12'
                href='https://ens.domains'
                target='_blank'
              >
                <Image src='/assets/ens-dao-logo.svg' alt='0x' width={316} height={100} className='pl-4' />
              </Link>
              <Link
                className='flex h-fit items-center justify-center transition-transform hover:rotate-12'
                href='https://mask.io'
                target='_blank'
              >
                <Image src='/assets/mask-logo.png' alt='0x' width={280} height={100} className='h-fit' />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='px-4 py-20 sm:px-0 lg:py-28'>
          <div className='flex w-full flex-col items-center gap-12 lg:gap-18'>
            <h2 className='text-5xl'>Contact</h2>
            <p className='flex items-center gap-2 text-lg'>
              <Image src='/assets/icons/ui/mail.svg' alt='Email' width={24} height={24} />
              <a href='mailto:contact@ethid.org' className='hover:underline'>
                contact@ethid.org
              </a>
            </p>
          </div>
        </section>
      </main>

      <BackToTop />

      <footer className='mt-20 w-full bg-[#333] py-20 text-white'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4'>
          <div className='flex items-start'>
            <Link href='#home'>
              <Image src='/assets/logo-full-light.svg' alt='Ethereum Identity Foundation' width={124} height={40} />
            </Link>
          </div>

          <div className='flex flex-col space-y-2'>
            <Link href='#home' className='hover:underline'>
              Home
            </Link>
            <Link href='#projects' className='hover:underline'>
              Projects
            </Link>
            <Link href='#team' className='hover:underline'>
              Team
            </Link>
            <Link href='#board' className='hover:underline'>
              Board
            </Link>
            <Link href='#supporters' className='hover:underline'>
              Supporters
            </Link>
            <Link href='#contact' className='hover:underline'>
              Contact
            </Link>
          </div>

          <div className='flex flex-col space-y-2'>
            <Link href='https://ethidentitykit.com' target='_blank' className='hover:underline'>
              Ethereum Identity Kit
            </Link>
            <Link href='https://efp.app' target='_blank' className='hover:underline'>
              Ethereum Follow Protocol
            </Link>
            <Link href='https://github.com/ethereumidentitykit/ENS-Worker' target='_blank' className='hover:underline'>
              ENS Worker
            </Link>
          </div>

          <div className='flex items-start space-x-2'>
            <Image src='/assets/icons/ui/mail.svg' alt='Email' width={24} height={24} className='invert' />
            <a href='mailto:contact@ethid.org' className='hover:underline'>
              contact@ethid.org
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
