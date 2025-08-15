"use client"

import { useState, useRef } from "react"

export default function InteractiveCard({
  children,
  className = "",
  depth = 4,
  backgroundImage = "",
  backgroundOpacity = 0.1,
  glareEffect = true,
  enhanced = false,
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // 카드 중앙을 기준으로 마우스 위치 계산 (-1 ~ 1 범위)
    const centerX = (e.clientX - rect.left) / rect.width - 0.5
    const centerY = (e.clientY - rect.top) / rect.height - 0.5

    // 회전 각도 계산 (최대 10도)
    setRotateY(centerX * depth)
    setRotateX(-centerY * depth)

    // 글레어 효과 위치 계산
    setGlarePosition({ x: centerX, y: centerY })
  }

  const handleMouseEnter = () => {
    setScale(1.04)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
    setGlarePosition({ x: 0, y: 0 })
  }

  const cardClasses = `
    relative overflow-hidden rounded-xl transition-transform card-transition
    ${enhanced ? "card-enhanced highlight-effect" : ""}
    ${className}
  `

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: backgroundOpacity,
            zIndex: 0,
          }}
        />
      )}

      {glareEffect && (
        <div
          className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white to-transparent opacity-0 transition-opacity duration-300`}
          style={{
            opacity:
              Math.sqrt(glarePosition.x * glarePosition.x + glarePosition.y * glarePosition.y) * 0.3,
            transform: `rotate(${Math.atan2(glarePosition.y, glarePosition.x) * (180 / Math.PI)}deg)`,
          }}
        />
      )}

      <div className="relative z-0">{children}</div>
    </div>
  )
}
