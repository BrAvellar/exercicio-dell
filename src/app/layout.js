import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { BetsProvider } from "@/hooks/useBets";
import { UserBetsProvider } from "@/hooks/useUserBets";
import { RaffleProvider } from "@/hooks/useRaffle";
import { UserFundsProvider } from "@/hooks/useUserFunds";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserFundsProvider>
          <BetsProvider>
            <RaffleProvider>
              <UserBetsProvider>
                {children}
                <Toaster />
              </UserBetsProvider>
            </RaffleProvider>
          </BetsProvider>
        </UserFundsProvider>
      </body>
    </html>
  );
}
