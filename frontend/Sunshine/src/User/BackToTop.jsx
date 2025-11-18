import React, { useEffect, useState } from 'react'
import '../styles/BackToTop.css'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.pageYOffset > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const btn = document.getElementById('back-to-top-btn')
    if (btn) {
      btn.classList.remove('btt-pulse')
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      void btn.offsetWidth
      btn.classList.add('btt-pulse')
    }
  }

  return (
    <button
      id="back-to-top-btn"
      aria-label="Scroll to top"
      className={`back-to-top ${visible ? 'show' : ''}`}
      onClick={scrollToTop}
      title="Back to top"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 5l-7 7h4v7h6v-7h4l-7-7z" fill="currentColor" />
      </svg>
    </button>
  )
}

export default BackToTop
