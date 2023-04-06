import React, { useState, useEffect } from 'react'
import styles from '../styles/Game_3.module.css'
import eyeImage from '../assets/images/game_3/eye.png'
import bgImage from '../assets/images/game_3/board.png'

export default function Game_03() {
  const [position, setPosition] = useState({ x: 419, y: 210 })
  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
  const [blankSpotXContainer, setBlankSpotXContainer] = useState(0)
  const [blankSpotYContainer, setBlankSpotYContainer] = useState(0)

  useEffect(() => {
    const image = new Image()
    image.src = bgImage
    image.onload = () => {
      setImageWidth(image.naturalWidth)
      setImageHeight(image.naturalHeight)
      const blankSpotX = 196 // replace with actual x-coordinate of blank spot
      const blankSpotY = 107 // replace with actual y-coordinate of blank spot
      const containerWidth = document.getElementById('container').offsetWidth
      const containerHeight = document.getElementById('container').offsetHeight
      const blankSpotXPercent = (blankSpotX / image.naturalWidth) * 100
      const blankSpotYPercent = (blankSpotY / image.naturalHeight) * 100
      const blankSpotXContainer = (containerWidth * blankSpotXPercent) / 100
      const blankSpotYContainer = (containerHeight * blankSpotYPercent) / 100
      setBlankSpotXContainer(blankSpotXContainer)
      setBlankSpotYContainer(blankSpotYContainer)
    }
  }, [])

  useEffect(() => {
    console.log(('imageWidth', blankSpotXContainer), blankSpotYContainer)
  }, [blankSpotYContainer])

  return (
    <div className={styles.backGround}>
      <div className={styles.gameWindow}>
        <img
          id="container"
          style={{
            position: 'relative',
            left: blankSpotXContainer,
            top: blankSpotYContainer,
          }}
          className={styles.movingItem}
          src={eyeImage}
        />
      </div>
    </div>
  )
}
