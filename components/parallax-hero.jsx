"use client"

import { useRef, useEffect } from "react"
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

export default function ParallaxHero({
  imageUrl = "/placeholder.svg?height=1080&width=1920",
  title,
  subtitle,
  height = "500px",
  overlayOpacity = 0.5,
  children,
  offsetY = "0px",
}) {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrollPosition = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {/* 패럴랙스 배경 이미지 */}
      <ParallaxProvider>
        <Parallax speed={-25}>
          <div
            ref={parallaxRef}
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-500"
            style={{
              backgroundImage: `url(${imageUrl})`,
              height: `calc(${height} + 200px)`,
              top: `calc(${offsetY} - 300px)`,
              filter: "none",
            }}
          />
        </Parallax>
      </ParallaxProvider>

      {/* 오버레이 */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500`}
        style={{ opacity: overlayOpacity }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        {title && (
          <h1
            className={`animate-fade-in-down mb-2 text-4xl font-semibold md:text-5xl lg:text-6xl bg-gradient-to-r from-cyan-300 via-pink-400 to-amber-400 bg-clip-text text-transparent text-shadow-sm`}
          >
            {title}
          </h1>
        )}

        {subtitle && (
          <p
            className={`animate-fade-in-down-delay mb-8 max-w-2xl text-lg font-light md:text-xl bg-gradient-to-l from-cyan-100 via-pink-200 to-amber-200 bg-clip-text text-transparent`}
          >
            {subtitle}
          </p>
        )}

        {children && <div className="animate-fade-in-up">{children}</div>}
      </div>
    </div>
  )
}
