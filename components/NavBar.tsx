"use client";

import posthog from 'posthog-js'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

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

        <div className="flex items-center gap-4">
          <ul className='hidden sm:flex items-center gap-6 text-sm'>
            <Link href="/" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Home', target_url: '/' })} >Home</Link>
            <Link href="/events" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Events', target_url: '/' })}>Events</Link>
            <Link href="/" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Register for Event', target_url: '/' })}>Register Your Event</Link>
          </ul>

          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center rounded-md border border-neutral-700 p-2 text-white hover:border-red-500 hover:text-red-400 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className={`block h-0.5 w-6 bg-current transition-transform ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-current my-1 transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-current transition-transform ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="sm:hidden px-5 mt-3">
          <ul className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm">
            <Link href="/" onClick={() => { posthog.capture('navbar_link_clicked', { link_text: 'Home', target_url: '/' }); closeMenu(); }}>Home</Link>
            <Link href="/events" onClick={() => { posthog.capture('navbar_link_clicked', { link_text: 'Events', target_url: '/' }); closeMenu(); }}>Events</Link>
            <Link href="/" onClick={() => { posthog.capture('navbar_link_clicked', { link_text: 'Register for Event', target_url: '/' }); closeMenu(); }}>Register Your Event</Link>
          </ul>
        </div>
      )}
    </header>
  )
}

export default NavBar
