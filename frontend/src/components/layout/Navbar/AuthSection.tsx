// src/components/layout/navbar/AuthSection.tsx

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';

const AuthSection = () => {
  const { user } = useUser();

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition hover:cursor-pointer">
            Login
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center gap-2 text-white">
          <UserButton afterSignOutUrl="/" />
          <div className="text-sm leading-tight hidden md:block">
            <div className="font-semibold">Admin User</div>
            <div className="text-xs text-gray-300">{user?.emailAddresses[0]?.emailAddress}</div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default AuthSection;
