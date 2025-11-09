"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react"
import { Maximize2, Minimize2, Menu, X } from "lucide-react"

interface WindowProps {
  id: string
  title: string
  children: ReactNode
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  isMaximized: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onPositionChange: (position: { x: number; y: number }) => void
  onSizeChange: (size: { width: number; height: number }) => void
}

export function Window({
  id,
  title,
  children,
  position,
  size,
  zIndex,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showControls, setShowControls] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && !isMaximized && !isMobile) {
        requestAnimationFrame(() => {
          onPositionChange({
            x: e.clientX - dragStart.x,
            y: Math.max(28, e.clientY - dragStart.y),
          })
        })
      }
      if (isResizing && !isMaximized && !isMobile) {
        requestAnimationFrame(() => {
          onSizeChange({
            width: Math.max(400, e.clientX - position.x),
            height: Math.max(300, e.clientY - position.y),
          })
        })
      }
    },
    [isDragging, isResizing, dragStart, position, isMaximized, isMobile, onPositionChange, onSizeChange],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile && (e.target === e.currentTarget || (e.target as HTMLElement).closest(".window-titlebar"))) {
      onFocus()
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.stopPropagation()
      onFocus()
      setIsResizing(true)
    }
  }

  const mobileStyle = isMobile
    ? {
        left: 0,
        top: 28, // Below menu bar
        width: "100vw",
        height: "calc(100vh - 28px - 68px)", // Subtract menu bar and dock height
        zIndex,
      }
    : {
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }

  return (
    <div
      ref={windowRef}
      className={`absolute shadow-2xl md:rounded-lg overflow-hidden bg-white transition-all duration-200 ${
        isAnimating ? "animate-scale-in opacity-0" : "opacity-100"
      } ${isDragging ? "cursor-grabbing" : ""}`}
      style={{
        ...mobileStyle,
        willChange: isDragging || isResizing ? "transform" : "auto",
      }}
      onMouseDown={() => onFocus()}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Title bar */}
      <div
        className="window-titlebar h-11 bg-white/80 backdrop-blur-xl border-b border-black/10 flex items-center justify-between px-4 cursor-move select-none group"
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        {isMobile ? (
          <button
            className="p-1 hover:bg-black/10 rounded transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className={`w-3 h-3 rounded-full bg-gray-400 hover:bg-gray-500 transition-all flex items-center justify-center ${
                showControls ? "opacity-100" : "opacity-60"
              }`}
              onClick={onClose}
            >
              {showControls && <span className="text-[8px] text-white">✕</span>}
            </button>
            <button
              className={`w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-all flex items-center justify-center ${
                showControls ? "opacity-100" : "opacity-60"
              }`}
              onClick={onMinimize}
            >
              {showControls && <Minimize2 className="w-2 h-2 text-gray-700" />}
            </button>
            <button
              className={`w-3 h-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-all flex items-center justify-center ${
                showControls ? "opacity-100" : "opacity-60"
              }`}
              onClick={onMaximize}
            >
              {showControls && <Maximize2 className="w-2 h-2 text-gray-700" />}
            </button>
          </div>
        )}

        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-black">{title}</div>

        {isMobile && (
          <button className="p-1 hover:bg-black/10 rounded transition-colors" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isMobile && mobileMenuOpen && (
        <div className="absolute top-11 left-0 right-0 bg-white border-b border-black/10 shadow-lg z-50 animate-slide-down">
          <div className="py-2">
            <button
              className="w-full px-4 py-3 text-left hover:bg-black/5 transition-colors flex items-center gap-3 text-black"
              onClick={() => {
                onMinimize()
                setMobileMenuOpen(false)
              }}
            >
              <Minimize2 className="w-5 h-5" />
              <span>Minimize</span>
            </button>
            <button
              className="w-full px-4 py-3 text-left hover:bg-black/5 transition-colors flex items-center gap-3 text-black"
              onClick={() => {
                onClose()
                setMobileMenuOpen(false)
              }}
            >
              <X className="w-5 h-5" />
              <span>Close Window</span>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="h-[calc(100%-44px)] overflow-auto bg-white">{children}</div>

      {/* Resize handle */}
      {!isMaximized && !isMobile && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" onMouseDown={handleResizeMouseDown} />
      )}
    </div>
  )
}
