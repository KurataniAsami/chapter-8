import React from 'react'
import Link from "next/link"

const Header = () => {
  return (
    <div className='bg-gray-500 flex justify-between items-center px-5 py-3'>
      <div>
        <Link href="/" className='text-white text-2xl'>Blog</Link>
      </div>
      <div>
        <Link href="/contact" className='text-white text-2xl'>お問い合わせ</Link>
      </div>
    </div>
  )
}

export default Header