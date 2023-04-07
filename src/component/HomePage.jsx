import React from 'react'
import styles from '../styles/HomePage.module.css'

export default function HomePage({ buttonLinks }) {
  return (
    <div
      className={styles.background}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          className={styles.button}
          onClick={() => (window.location.href = buttonLinks[0])}
        >
          කනා මුට්ටි
        </button>
        <button
          className={styles.button}
          onClick={() => (window.location.href = buttonLinks[1])}
        >
          කොට්ට පොර
        </button>
        <button
          className={styles.button}
          onClick={() => (window.location.href = buttonLinks[2])}
        >
          අලියට ඇස් තැබීම
        </button>
      </div>
    </div>
  )
}
