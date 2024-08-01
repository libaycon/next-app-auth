import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn-util";
import {LoginButton} from "@/app/auth/_components/login-button"

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-bl from-sky-400 to-blue-700">
      <div className="space-y-6 text-center">
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className)}>
          🔏 Auth
        </h1>
        <p className="text-white text-lg">
          A simple authentication service
        </p>
        <div>
          <LoginButton mode="redirect">
          <Button
            variant={"secondary"}
            size="lg"
          >
            Sign in
          </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
