"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function ImageGallery({ images = [], isDetailView = "true", grids = "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const openImage = (image) => {
    setSelectedImage(image)
    // document.body.style.overflow = "hidden" // 스크롤 방지
  }

  const closeImage = () => {
    setSelectedImage(null)
    // document.body.style.overflow = "auto" // 스크롤 복원
  }

  return (
    <div>
      
      <div className={`grid gap-4 ${grids}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`overflow-hidden rounded-lg transition-transform duration-300 ${isDetailView === "true" ? "cursor-pointer hover:scale-105 active:scale-95" : ""}`}
            onClick={isDetailView === "true" ? () => openImage(image) : undefined}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt || `Gallery image ${index + 1}`}
              className={`h-full w-full object-cover transition-transform duration-300 ${isDetailView === "true" ? "hover:scale-110" : ""}`}
            />
          </div>
        ))}
      </div>

      {/* 확대된 이미지 모달 */}
      {selectedImage && (
        <div
          className="ml-4 mr-4 fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in rounded-xl shadow-lg"
          onClick={closeImage}
        >
          <button className="absolute right-4 top-4 rounded-full bg-white/25 p-2 text-white backdrop-blur-sm transition-transform hover:scale-110 active:scale-90">
            <X className="h-8 w-8" />
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw] animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt || "Enlarged image"}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
            {selectedImage.caption && <p className="mt-2 text-sm text-center text-gray-300">{selectedImage.caption}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
