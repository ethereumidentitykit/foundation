import Image from 'next/image'
import React, { useState } from 'react'

import { SECOND } from '#/lib/constants'
import Copy from 'public/assets/icons/ui/copy.svg'

interface CopyValueProps {
  value: string
  text: string
}

const CopyValue: React.FC<CopyValueProps> = ({ value, text }) => {
  const [hasBeenCopied, setHasBeenCopied] = useState(false)

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value)
        setHasBeenCopied(true)
        setTimeout(() => setHasBeenCopied(false), 3 * SECOND)
      }}
      className='hover:bg-text/5 relative flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm p-4 text-xs font-bold transition-colors'
    >
      <Image src={Copy} alt='Copy' width={16} height={16} className='h-auto w-4' />
      <p className='text-nowrap'>{hasBeenCopied ? 'copied' : text}</p>
    </button>
  )
}

export default CopyValue
