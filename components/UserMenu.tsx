import React from 'react'
import { signOut } from 'next-auth/react'
import useCurrentUser from '@/hooks/useCurrentUser'

interface UserMenuProps {
  visable?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ visable }) => {
  const { data: currentUser } = useCurrentUser()
  if (!visable) {
    return null;
  }

  const SignOut = async () => {
    await signOut({
      callbackUrl: 'https://www.netflix.com/gb/logout',
    });
  }

  return (
    <div className="bg-black w-max flex absolute top-14 right-0 py-5 border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        
        <div className="px-5 group/item flex flex-row gap-2 items-center w-full">
          <img src="/images/default-blue.png" className="w-7 rounded-md" alt="User logo" />
          <p className="text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
        </div>

        <hr className="bg-gray-600 border-0 h-px my-1 w-full" />
        
        <div onClick={SignOut} className="px-4 text-center text-white text-sm hover:underline">
          Sign out of freeflix
        </div>
      </div>
    </div>
  )
}

export default UserMenu;