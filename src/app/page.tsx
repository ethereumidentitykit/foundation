import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import Carousel from '#/components/carousel'
import BackToTop from '#/components/back-to-top'
import Navigation from '#/components/navigation'
import UserProfile from '#/components/user-profile'
import FooterLinks from '#/components/footer-links'
import { FOUNDATION_ADDRESSES, FOUNDATION_ROLES, TEAM_ADDRESSES, TEAM_ROLES } from '#/lib/constants/team'

export const metadata: Metadata = {
  title: 'EthID',
  openGraph: {
    title: 'EthID',
    siteName: 'EthID',
    description: 'Bringing identity onchain with the Ethereum identity stack.',
    url: 'https://ethid.org',
    images: [
      {
        url: 'https://ethid.org/assets/og.png',
      },
    ],
  },
  twitter: {
    images: 'https://ethid.org/assets/og.png',
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
          <h1 className='pointer-events-none hidden text-3xl md:text-6xl'>EthID</h1>
          <Image src='/assets/ethid.svg' alt='EthID' width={124} height={40} className='h-auto w-60 md:w-80' />
          <p className='mx-auto text-lg md:text-xl'>Bringing identity onchain with the Ethereum identity stack.</p>
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
                href='https://siwe.xyz'
                target='_blank'
                className='group relative flex h-[60vw] w-full flex-col items-start justify-end gap-2 overflow-hidden bg-white p-4 text-white sm:p-6 md:h-[30vw] lg:gap-4 lg:p-8'
              >
                <Image
                  src='/assets/art/siwe-project.png'
                  alt='SIWE'
                  width={2000}
                  height={1200}
                  className='absolute top-0 left-0 z-0 h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <h3 className='z-20 text-2xl group-hover:underline lg:text-3xl xl:text-4xl'>Sign in with Ethereum</h3>
                <p className='z-20 text-base font-light lg:text-lg'>Authentication with Ethereum accounts</p>
              </Link>
              <Link
                href='https://grails.app'
                target='_blank'
                className='group relative flex h-[60vw] w-full flex-col items-start justify-end gap-2 overflow-hidden bg-white p-4 text-white sm:p-6 md:h-[30vw] lg:gap-4 lg:p-8'
              >
                <Image
                  src='/assets/art/grails-market.png'
                  alt='SIWE'
                  width={2000}
                  height={1200}
                  className='absolute top-0 left-0 z-0 h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <h3 className='z-20 text-2xl group-hover:underline lg:text-3xl xl:text-4xl'>Grails Market</h3>
                <p className='z-20 text-base font-light lg:text-lg'>
                  Secondary market for ENS (Ethereum Name Service) names.
                </p>
              </Link>
              <Link
                href='https://x.com/ENSMarketBot'
                target='_blank'
                className='group relative flex h-[60vw] w-full flex-col items-start justify-end gap-2 overflow-hidden bg-white p-4 text-white sm:p-6 md:h-[30vw] lg:gap-4 lg:p-8'
              >
                <Image
                  src='/assets/art/ens-bot-project.png'
                  alt='ENS Market bot'
                  width={2000}
                  height={1200}
                  className='absolute top-0 left-0 z-0 h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <h3 className='z-20 text-2xl group-hover:underline lg:text-3xl xl:text-4xl'>ENS Market Bot</h3>
                <p className='z-20 text-base font-light lg:text-lg'>
                  Twitter bot that tracks ENS sales, registrations, and offers.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/*  Supporter (Sponsors) Section */}
        <section id='supporters' className='flex min-h-[80vh] items-center justify-center px-4 py-20 sm:px-0 lg:py-28'>
          <div className='flex w-full flex-col items-center gap-20'>
            <h2 className='text-5xl'>Supporters</h2>
            <Carousel />
            <div className='flex flex-wrap items-center justify-center gap-20'>
              <Link
                className='flex h-fit items-center justify-center transition-transform hover:-rotate-12'
                href='https://ensdao.org/'
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

        {/* Team Section */}
        <section id='team' className='w-full px-4 py-20 md:px-0 lg:py-28'>
          <div className='flex w-full flex-col items-center gap-12 lg:gap-18'>
            <h2 className='text-5xl'>Team</h2>
            <div className='flex w-full flex-col gap-8 font-sans md:gap-0'>
              {TEAM_ADDRESSES.map((address, index) => (
                <UserProfile
                  key={`team-${address}`}
                  address={address as `0x${string}`}
                  role={TEAM_ROLES[index]}
                  className='w-full md:shadow-none'
                />
              ))}
            </div>
          </div>
        </section>

        {/* Board Section */}
        <section id='board' className='px-4 py-20 md:px-0 lg:py-28'>
          <div className='flex w-full flex-col items-center gap-12 lg:gap-18'>
            <h2 className='text-5xl'>Board</h2>
            <div className='flex w-full flex-col gap-8 font-sans md:gap-0'>
              {FOUNDATION_ADDRESSES.map((address, index) => (
                <UserProfile
                  key={`board-${address}`}
                  address={address as `0x${string}`}
                  role={FOUNDATION_ROLES[index]}
                  className='w-full shadow-md md:shadow-none'
                />
              ))}
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

      <footer className='mt-20 w-full bg-[#333] py-10 text-white md:py-20'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4'>
          <div className='flex items-center justify-center md:items-start'>
            <Link href='#home'>
              <Image src='/assets/ethid-light.svg' alt='EthID' width={124} height={40} />
            </Link>
          </div>

          <FooterLinks />

          <div className='flex flex-col items-center space-y-2 md:items-start'>
            <Link href='https://ethidentitykit.com' target='_blank' className='hover:underline'>
              Ethereum Identity Kit
            </Link>
            <Link href='https://efp.app' target='_blank' className='hover:underline'>
              Ethereum Follow Protocol
            </Link>
            <Link href='https://siwe.xyz' target='_blank' className='hover:underline'>
              Sign in with Ethereum
            </Link>
            <Link href='https://x.com/ENSMarketBot' target='_blank' className='hover:underline'>
              ENS Market Bot
            </Link>
          </div>

          <div className='flex w-full items-center justify-center space-x-2 md:items-start md:justify-start'>
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
