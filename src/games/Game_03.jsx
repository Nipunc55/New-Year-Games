import React, { useState, useEffect } from 'react'
import styles from '../styles/Game_3.module.css'
import eyeImage from '../assets/images/game_3/eye.png'
import bgImage from '../assets/images/game_3/board.png'
import Score from '../component/Score'
import GamePopUp from '../component/GameOverPopUp'

export default function Game_03() {
  const [position, setPosition] = useState({ x: 419, y: 210 })
  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
  const [blankSpotXContainer, setBlankSpotXContainer] = useState(0)
  const [blankSpotYContainer, setBlankSpotYContainer] = useState(0)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(3)
  const [buttonClick, setClickStatus] = useState(false)
  const [gameOver, setGameOver] = useState(false)

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
    setClickStatus(true)

    const eyeElement = document.getElementById('eye-image')
    Animation('paused')

    const currentEyePositon = getCurrentPositionOf(eyeElement)
    console.log('success', currentEyePositon, blankSpotXContainer)
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
  const Animation = (status) => {
    const eyeElement = document.getElementById('eye-image')
    eyeElement.style.animationPlayState = status
  }
  const RestartGame = () => {
    setGameOver(false)
    setRound(3)
    setScore(0)

    Animation('')
  }
  useEffect(() => {
    if (round < 1) {
      setGameOver(true)
    }
  }, [round])
  const mouseClick = (event) => {
    console.log(event.clientX, event.clientY)
  }
  return (
    <div onClick={mouseClick} className={styles.backGround}>
      <Score score={score} round={round} />
      <GamePopUp score={score} show={gameOver} resetButton={RestartGame} />
      <div className={styles.buttonContainer}>
        {buttonClick != true ? (
          <button
            onClick={() => {
              handleClick()
            }}
            className={styles.button}
          >
            Mark
          </button>
        ) : (
          <button
            onClick={() => {
              Animation('')
              setClickStatus(false)
            }}
            className={styles.button}
          >
            TryAgain
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
