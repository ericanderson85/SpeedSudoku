'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Image from 'next/image'
import useClickOutside from '@/lib/hooks/useClickOutside';
import { useState } from 'react';

export default function ProfileButton() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useClickOutside(() => {
    setIsFocused(false);
  });

  const { user, error, isLoading } = useUser();
  if (error) return <div>{error.message}</div>;
  if (isLoading || !user) return (
    <div className="w-16 h-10 flex flex-col justify-center items-center relative">
      <Link href="/api/auth/login">Log In</Link>
    </div>
  );


  return (
    <div
      onClick={() => setIsFocused((prev) => !prev)}
      ref={ref}
      className="w-16 h-10 flex flex-col justify-center items-center relative">
      <Image
        src="/images/default-profile.png"
        alt="User profile"
        width={40}
        height={40}
        className="h-10 w-10 cursor-pointer"
      />
      {isFocused &&
        <div className="flex flex-col items-center justify-center absolute top-10">
          <Link href="/me">Profile</Link>
          <Link href="/api/auth/logout">Log Out</Link>
        </div>
      }
    </div>
  );
}