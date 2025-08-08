import "./globals.css"
import { Inter } from "next/font/google"
import { Noto_Sans_JP } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/i18n"

const inter = Inter({ subsets: ["latin"] })
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  // variable: '--font-noto-sans-jp',
  // weight: 'variable', // default なので不要。バリアブルフォントでなければ必要
  display: 'swap', // default なので不要
  // preload: true, // default なので不要
  // adjustFontFallback: true, // next/font/google で default なので不要
  // fallback: ['system-ui', 'arial'], // local font fallback なので不要
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
})

export const metadata = {
  title: "Shin JeongSoon's Portfolio",
  description: "UIアニメーションデザイナー（Shin JeongSoon）のポートフォリオ",
    generator: ''
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      {/* <body className={inter.className}> */}
      <body className={(notoSansJP.className, 'font-sans')}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
