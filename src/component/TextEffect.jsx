import React, { useState, useEffect } from 'react'
import styles from '../styles/TextEffect.module.css'

export default function TextEffect(props) {
  useEffect(() => {
    if (props.show) {
      const textContainer = document.getElementById('text-effect-container')
      textContainer.style.animationPlayState = ''
      return
    }
  }, [props])

  return (
    <>
      {props.show != true ? null : (
        <div id="text-effect-container" className={styles.textEffect}>
          <h1>{props.score}</h1>
        </div>
      )}
    </>
  )
}
