import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const NavBar = () => {
  return (
    <header>
        <nav>
           <Link href="/" className='logo'>
                <Image
                    src='/icons/f1.png'
                    alt = 'logo'
                    width={40}
                    height={40}
                />

                <p>RaceEvent</p>
           </Link>

           <ul>
            <Link href="/">Home</Link>
            <Link href="/">Events</Link>
            <Link href="/">Register for Event</Link>
           </ul>
        </nav>
    </header>
  )
}

export default NavBar
