import { SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 gap-4 h-16">
            <div>
                <p className="font-bold text-2xl">{'Pet Friends'}</p>
            </div>
            <div className="flex gap-2">
                <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                        <button>
                        Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
      </header>
    )
};
