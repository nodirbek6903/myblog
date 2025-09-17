import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} MyBlog. Barcha huquqlar himoyalangan.
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <a
            href="https://t.me/Nodirbek_6903"
            target="_blank"
            className="hover:text-yellow-400"
          >
            Telegram
          </a>
          <a
            href="https://github.com/nodirbek6903"
            target="_blank"
            className="hover:text-yellow-400"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nodirjonumarov"
            target="_blank"
            className="hover:text-yellow-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer