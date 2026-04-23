'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'ethereum-identity-kit'
import type { Address } from 'viem'

import User from '#/components/ui/user'
import { cn } from '#/lib/utilities'

interface Testimonial {
  quote: string
  url: string
  address: Address
}

const TESTIMONIALS: Testimonial[] = [
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

const AUTO_ROTATE_MS = 8500

const getVisibleCount = (width: number | null): number => {
  if (!width || width < 768) return 1
  if (width < 1024) return 2
  return 3
}

const Carousel = () => {
  const { width } = useWindowSize()
  const visibleCount = getVisibleCount(width)
  const total = TESTIMONIALS.length
  const needsCarousel = total > visibleCount
  const maxIndex = needsCarousel ? total - visibleCount : 0

  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Clamp index when the visible count changes (e.g. on resize).
  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!needsCarousel) return

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, AUTO_ROTATE_MS)
  }, [needsCarousel, maxIndex])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(index)
      resetTimer()
    },
    [resetTimer]
  )

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    resetTimer()
  }, [maxIndex, resetTimer])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    resetTimer()
  }, [maxIndex, resetTimer])

  const translateX = -(activeIndex * (100 / visibleCount))

  return (
    <div className='flex w-full max-w-[1232px] flex-col items-center justify-center gap-6 sm:px-4 md:gap-8'>
      <div className='relative w-full'>
        <div
          className='flex min-w-full items-stretch transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={testimonial.address}
              className='shrink-0 px-2 transition-all duration-400'
              style={{
                width: `${100 / visibleCount}%`,
                maxWidth: '100%',
                opacity: i > activeIndex + 2 || i < activeIndex ? 0 : 1,
              }}
            >
              <div className='flex h-full w-full flex-col justify-between gap-4 rounded-lg bg-zinc-100 pt-5'>
                <div className='flex flex-col gap-4 px-5'>
                  <div className='flex items-start justify-between gap-3'>
                    <Image src='/assets/icons/ui/quotes.svg' alt='' width={24} height={24} aria-hidden='true' />
                    <a
                      href={testimonial.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='shrink-0 transition-transform hover:scale-110'
                      aria-label='View source'
                    >
                      <Image src='/assets/icons/ui/link-black.svg' alt='' width={20} height={20} aria-hidden='true' />
                    </a>
                  </div>
                  <p className='text-lg text-wrap'>{testimonial.quote}</p>
                </div>
                <User
                  address={testimonial.address}
                  className='h-16 w-full max-w-full gap-2 rounded-b-lg px-5'
                  wrapperClassName='max-w-full'
                  avatarSize='40px'
                  fontSize='18px'
                />
              </div>
            </div>
          ))}
        </div>

        {needsCarousel && (
          <>
            <button
              type='button'
              onClick={goPrev}
              aria-label='Previous testimonial'
              className='bg-neutral hover:bg-nav-item text-text shadow-medium absolute top-1/2 -left-2.5 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-all sm:-left-3 sm:h-10 sm:w-10 lg:-left-3 lg:h-12 lg:w-12 xl:-left-[min(calc(100vw-1286px),3rem)]'
            >
              <Image
                src='/assets/icons/ui/arrow-up.svg'
                alt=''
                width={18}
                height={18}
                aria-hidden='true'
                className='-rotate-90'
              />
            </button>
            <button
              type='button'
              onClick={goNext}
              aria-label='Next testimonial'
              className='bg-neutral hover:bg-nav-item text-text shadow-medium absolute top-1/2 -right-2.5 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-all sm:-right-3 sm:h-10 sm:w-10 lg:-right-3 lg:h-12 lg:w-12 xl:-right-[min(calc(100vw-1286px),3rem)]'
            >
              <Image
                src='/assets/icons/ui/arrow-up.svg'
                alt=''
                width={18}
                height={18}
                aria-hidden='true'
                className='rotate-90'
              />
            </button>
          </>
        )}
      </div>

      {needsCarousel && (
        <div className='flex items-center justify-center gap-2'>
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                activeIndex === i ? 'w-6 bg-gray-700' : 'bg-tertiary w-2.5 hover:bg-gray-700/50'
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
