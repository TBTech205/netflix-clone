import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import UserMenu from '@/components/UserMenu';

const TOP_OFFSET = 66;

interface MobileMenuProps {
  visable?: boolean;
}
interface NavbarItemProps {
  label: string,
  url?: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, url }) => {
  return (
    <div className="text-white cursor-pointer transition hover:text-gray-300 ">
      {label}
    </div>
  )
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visable }) => {
  if (!visable) return null

  return (
    <div className="bg-zinc-800 text-white absolute top-8 left-0 w-max py-4 flex flex-col items-start border-2 border-gray-800">
      <div className="flex flex-col gap-4 text-left text">
        <div className="px-3 hover:underline">Home</div>
        <div className="px-3 hover:underline">Films</div>
        <div className="px-3 hover:underline">New & Popular</div>
        <div className="px-3 hover:underline">My List</div>
      </div>
    </div>
  )
}

const Navbar = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [showBackground])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, [showMobileMenu])

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu((current) => !current);
  }, [showUserMenu])

  const bg = showBackground ? 'bg-zinc-800 bg-opacity-90' : 'bg-zinc-900 bg-opacity-0';
  const smm = showMobileMenu ? 'rotate-180' : 'rotate-0';
  const sum = showUserMenu ? 'rotate-180' : 'rotate-0';

  return (
    <nav className="w-full fixed z-40">
      <div className={`${bg} px-3 py-3 flex justify-between items-center transition duration-500 md:px-14`}>
        <div className="flex items-center">
          <img src="/images/logo.png" className="h-8" alt="Logo" />

          <div className="ml-8 gap-3 hidden md:flex">
            <NavbarItem label='Home' />
            <NavbarItem label='Films' />
            <NavbarItem label='New & Popular' />
            <NavbarItem label='My List' />
          </div>

          {/* Mobile */}
          <div onClick={toggleMobileMenu} className="md:hidden flex flex-row gap-2 items-center ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown className={`${smm} text-white text-sm transition`} />
            <MobileMenu visable={showMobileMenu} />
          </div>
        </div>

        <div onClick={toggleUserMenu} className="flex items-center cursor-pointer relative select-none">
          <div className="w-8 h-8 rounded-md overflow-hidden mr-3">
            <img src="/images/default-blue.png" alt="" />
          </div>
          <BsChevronDown className={`${sum} text-white text-sm transition`} />
          <UserMenu visable={showUserMenu} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar