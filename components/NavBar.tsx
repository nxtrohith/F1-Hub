"use client";

import posthog from 'posthog-js'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const NavBar = () => {
  return (
    <header>
        <nav>
           <Link href="/" className='logo' onClick={() => posthog.capture('navbar_logo_clicked', { target_url: '/' })}>
                <Image
                    src='/icons/f1.png'
                    alt = 'logo'
                    width={40}
                    height={40}
                />

                <p>RaceEvent</p>
           </Link>

           <ul>
            <Link href="/" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Home', target_url: '/' })} >Home</Link>
            <Link href="/" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Events', target_url: '/' })}>Events</Link>
            <Link href="/" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Register for Event', target_url: '/' })}>Register for Event</Link>
           </ul>
        </nav>
    </header>
  )
}

export default NavBar
