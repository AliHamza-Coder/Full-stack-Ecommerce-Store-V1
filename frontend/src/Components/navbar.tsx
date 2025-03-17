"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User, Moon, Sun } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { totalItems } = useCart()

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    // Close sidebar when toggling dark mode
    setIsMenuOpen(false)
  }

  // Close sidebar when route changes
  const handleNavigation = () => {
    setIsMenuOpen(false)
  }

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar")
      const menuButton = document.getElementById("menu-button")

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDarkMode = localStorage.getItem("darkMode");
      const isDark = storedDarkMode === "true"; // Default is false (light mode)
  
      setIsDarkMode(isDark);
      
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark"); // Ensure light mode is set
      }
    }
  }, []);
  

  // Save dark mode preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", isDarkMode.toString())
    }
  }, [isDarkMode])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <nav className="bg-gray-900 dark:bg-gray-950 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Atlantis Sports
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="hover:text-gray-300 transition-colors">
                Shop
              </Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative p-1 rounded-full hover:bg-gray-700 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Profile */}
            {/* <Link href="/profile" className="p-1 rounded-full hover:bg-gray-700 transition-colors">
              <User className="h-6 w-6" />
            </Link> */}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                id="menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Open menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 dark:bg-gray-900 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 pt-16 space-y-4">
          <Link
            href="/"
            className="block text-lg font-semibold text-white hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
            onClick={handleNavigation}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="block text-lg font-semibold text-white hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
            onClick={handleNavigation}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="block text-lg font-semibold text-white hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
            onClick={handleNavigation}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-lg font-semibold text-white hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
            onClick={handleNavigation}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

