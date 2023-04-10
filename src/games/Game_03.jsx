import React, { useState, useEffect } from 'react'
import styles from '../styles/Game_3.module.css'
import eyeImage from '../assets/images/game_3/eye.png'
import bgImage from '../assets/images/game_3/board.png'
import Score from '../component/Score'

export default function Game_03() {
  const [position, setPosition] = useState({ x: 419, y: 210 })
  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
  const [blankSpotXContainer, setBlankSpotXContainer] = useState(0)
  const [blankSpotYContainer, setBlankSpotYContainer] = useState(0)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(3)
  const [buttonClick, setClickStatus] = useState(false)

  useEffect(() => {
    const image = new Image()
    image.src = bgImage
    image.onload = () => {
      setImageWidth(image.naturalWidth)
      setImageHeight(image.naturalHeight)
      const blankSpotX = 210 // replace with actual x-coordinate of blank spot
      const blankSpotY = 90 // replace with actual y-coordinate of blank spot
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

  const handleClick = () => {
    // Get the mouse position relative to the viewport

    const eyeElement = document.getElementById('eye-image')
    StopAnimation(eyeElement)
    const x = event.clientX
    const y = event.clientY
    // console.log('initial position :', blankSpotXContainer, blankSpotYContainer)
    // Log the mouse position to the console

    // console.log(
    //   'current position of eye:',
    //   getCurrentPositionOf(eyeElement),
    //   eyeElement.offsetWidth,
    // )
    const currentEyePositon = getCurrentPositionOf(eyeElement)
    if (
      currentEyePositon <= blankSpotXContainer + eyeElement.offsetWidth / 2 &&
      currentEyePositon >= blankSpotXContainer
    ) {
      setScore((preScore) => preScore + 100)
      console.log('success', 1 / (currentEyePositon - blankSpotXContainer))
    } else {
      setRound((preRound) => preRound - 1)
      console.log('does not match', round)
    }
  }
  function getCurrentPositionOf(element) {
    const container = document.getElementById('container')
    const rect = element.getBoundingClientRect()
    const left = rect.left - container.getBoundingClientRect().left
    return left // the current X position of the element
  }
  const StopAnimation = (element) => {
    element.style.animationPlayState = 'paused'
  }
  useEffect(() => {
    console.log(buttonClick)
  }, [buttonClick])

  return (
    <div className={styles.backGround}>
      <Score score={score} round={round} />
      <div className={styles.buttonContainer}>
        {buttonClick == true ? (
          <button onClick={setClickStatus(false)} className={styles.button}>
            TryAgain
          </button>
        ) : (
          <button
            onClick={() => {
              handleClick()
              setClickStatus(true)
            }}
            className={styles.button}
          >
            Mark
          </button>
        )}
      </div>
      <div id="container" className={styles.gameWindow}>
        <img
          id="eye-image"
          style={{
            position: 'absolute',
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
