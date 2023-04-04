import React, { useState, useEffect } from 'react'
import styles from '../styles/LoadingBar.module.css'

const LoadingBar = (props) => {
  const [width, setWidth] = useState(100)
  const [width2, setWidth2] = useState(100)

  useEffect(() => {
    setWidth(() => {
      return props.life * 10
    })
    setWidth2(() => {
      return 100 - props.enemy / 10
    })
  }, [props])

  return (
    <>
      <div className={styles.loadingBarContainer}>
        <div className={styles.loadingBar} style={{ width: `${width2}%` }}>
          {' '}
          {width2}%
        </div>
      </div>
      <div className={styles.loadingBarContainerLeft}>
        <div className={styles.loadingBarLeft} style={{ width: `${width}%` }}>
          {' '}
          {width}%
        </div>
      </div>
    </>
  )
}

export default LoadingBar
