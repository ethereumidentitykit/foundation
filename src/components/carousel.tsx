'use client'

import Image from 'next/image'
import type { Address } from 'viem'
import { ProfileCard } from 'ethereum-identity-kit'
import { useEffect, useState, useRef, useCallback } from 'react'

interface CarouselItem {
  quote: string
  url: string
  address: Address
}

const CarouselItems: CarouselItem[] = [
  {
    quote: '[T]he EFP guys have delivered and keep delivering... They have made owning an ENS name more fun...',
    url: 'https://discuss.ens.domains/t/voting-report-lefteris-eth/20770',
    address: '0x2b888954421b424c5d3d9ce9bb67c9bd47537d12',
  },
  {
    quote: 'The team has delivered in spades…',
    url: 'https://discuss.ens.domains/t/voting-report-nick-eth/20746',
    address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
  },
  {
    quote: 'Baller product',
    url: 'https://discuss.ens.domains/t/voting-report-daostrat-eth/20779',
    address: '0xc02771315d0958f23a64140160e78ecb9bb8614e',
  },
  {
    quote: '[They] help developers and users see the magic that ENS enables…',
    url: 'https://x.com/blockchainjames/status/1921703497407561788',
    address: '0x6dc43be93a8b5fd37dc16f24872babc6da5e5e3e',
  },
  {
    quote: 'EFP is a great social primitive, and Ethereum Identity Kit makes ENS / EFP integrations simple.',
    url: 'https://thomasclowes.com/ens-service-provider-program-2-application-analysis/',
    address: '0xac50ce326de14ddf9b7e9611cd2f33a1af8ac039',
  },
  {
    quote: 'Their results are undeniable.',
    url: 'https://discuss.ens.domains/t/voting-report-slobo-eth/20768',
    address: '0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf',
  },
]

const useCarouselInterval = (callback: () => void, delay: number) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(callback, delay)
  }, [callback, delay])

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    startInterval()
    return () => {
      stopInterval()
    }
  }, [startInterval, stopInterval, callback, delay])

  return { startInterval, stopInterval }
}

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % CarouselItems.length)
  }, [])

  const { startInterval } = useCarouselInterval(handleNext, 7000)

  // Calculate the transform to center the current item
  const getTransform = useCallback(() => {
    const itemWidth = isMobile ? 332 : 720
    const gap = 36 // px, matches gap-9
    const containerWidth = carouselRef.current?.clientWidth || (isMobile ? 360 : 1200)
    const offset = (containerWidth - itemWidth) / 2
    return `translateX(calc(-${currentIndex * (itemWidth + gap)}px + ${offset}px))`
  }, [currentIndex, isMobile])

  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      startInterval() // Reset the interval when a dot is clicked
    },
    [startInterval]
  )

  return (
    <div ref={carouselRef} className='relative mx-auto w-full max-w-[1200px] overflow-hidden'>
      {/* Fade effect */}
      <div className='absolute top-0 left-0 z-10 h-full w-6 bg-gradient-to-r from-white to-transparent sm:w-32 md:w-64' />
      <div className='absolute top-0 right-0 z-10 h-full w-6 bg-gradient-to-l from-white to-transparent sm:w-32 md:w-64' />

      {/* Carousel items */}
      <div
        className='flex items-start gap-9 transition-transform duration-500 ease-in-out md:items-center'
        style={{
          transform: getTransform(),
        }}
      >
        {CarouselItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col-reverse items-center md:w-full md:max-w-[720px] md:flex-row md:gap-8`}
          >
            <div className='z-10 -translate-y-12 md:w-1/2 md:translate-y-0'>
              <ProfileCard
                addressOrName={item.address}
                onProfileClick={() => {
                  window.open(`https://efp.app/${item.address}`, '_blank')
                }}
                className='z-50 flex w-full shadow-md'
                style={{
                  paddingBottom: '12px',
                }}
              />
            </div>
            <div className='flex w-[332px] flex-row justify-center gap-1 bg-zinc-100 px-4 pt-4 pb-16 md:h-[200px] md:w-[700px] md:-translate-x-[360px] md:flex-col md:gap-4 md:py-6 md:pr-10 md:pl-[350px]'>
              <div className='flex w-[300px] items-center gap-2 md:flex-col md:items-start'>
                <p className='min-w-full text-lg'>
                  &quot;{item.quote}&quot;
                  <a href={item.url} target='_blank' rel='noopener noreferrer' className='ml-2 inline-block md:hidden'>
                    <Image src='/assets/icons/ui/link-black.svg' alt='External Link' width={16} height={16} />
                  </a>
                </p>
                <a
                  href={item.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hidden items-center gap-1 hover:underline md:flex'
                >
                  <Image src='/assets/icons/ui/link-black.svg' alt='External Link' width={16} height={16} />
                  <p>Link</p>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className='mt-2 flex justify-center gap-2 sm:mt-6 md:mt-8'>
        {CarouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full transition-colors ${index === currentIndex ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
