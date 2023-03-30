import React, { useRef, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import styles from '../styles/Game_1.module.css'
import destroyedTargetImage from '../assets/images/pot2.png'
import candyPotImage from '../assets/images/pot-candy.png'
import targetImage from '../assets/images/pot1.png'
import GamePopUp from '../component/GameOverPopUp'

function Game_01() {
  const [image, setImage] = useState(targetImage)
  const [strikeStatus, setStrikeButtonStatus] = useState(false)
  const [destroyedImage, setDesImage] = useState('')
  const [hammerPosition, setHammerPosition] = useState(0)
  const [hammerElement, setHammerElement] = useState()

  const [popupMsg, SetPoupMassage] = useState()
  //point system
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(3)

  const ref = useRef()
  const openPopup = () => ref.current.open()
  const closePopup = () => ref.current.close()

  useEffect(() => {
    if (round < 1) {
      setGameOver(true)
    }
  }, [round])
  function getCurrentPosition(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return matrix.m41 // the current X position of the element
  }

  const handleStrike = () => {
    const hammer = document.getElementById(styles.hammer)
    const targets = document.querySelectorAll(`.${styles.target}`)
    const hammerPosition = getCurrentPosition(hammer)

    targets.forEach((element, index) => {
      if (
        hammerPosition >= element.offsetLeft &&
        hammerPosition <= element.offsetLeft + element.offsetWidth
      ) {
        const result = CheckResult(index)

        PlayStrikeAnimation(element)
        if (result) {
          ChangeImage(element, candyPotImage)
          setScore((prevScore) => prevScore + 100)
          SetPoupMassage('you Won!')
        } else {
          ChangeImage(element, destroyedTargetImage)
          setRound((prevScore) => prevScore - 1)
          SetPoupMassage('you Lost! Try again')
        }

        StopAnimation(hammer)
        setHammerElement(hammer)
        setStrikeButtonStatus(true)
        return
      }
    })
  }
  const PlayStrikeAnimation = (element) => {
    element.classList.add(styles.hammerStrike)
    setTimeout(() => {
      element.classList.remove(styles.hammerStrike)
    }, 300)
  }
  const ResatrtGame = () => {
    PlayAgain()
    setRound(3)
    setScore(0)
  }
  const PlayAgain = () => {
    setGameOver(false)
    setStrikeButtonStatus(false)
    SetPoupMassage('')
    const targets = document.querySelectorAll(`.${styles.target}`)
    targets.forEach((element) => {
      element.src = targetImage
    })
    if (hammerElement != null) {
      hammerElement.style.animationPlayState = ''
    }

    setImage(targetImage)
  }
  const StopAnimation = (element) => {
    element.style.animationPlayState = 'paused'
  }
  const ChangeImage = (element, image) => {
    setDesImage(image)
    element.src = image
  }
  const CheckResult = (number) => {
    let randomNum = Math.floor(Math.random() * 4)
    if (number == randomNum) return true
    return false
  }

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <GamePopUp show={gameOver} score={score} resetButton={ResatrtGame} />

        <img src={image} alt="" className={styles.target} id={styles.target1} />
        <img src={image} alt="" className={styles.target} id={styles.target2} />
        <img src={image} alt="" className={styles.target} id={styles.target3} />
        <img src={image} alt="" className={styles.target} id={styles.target4} />
        <div className={styles.hammer} id={styles.hammer}></div>
      </div>
      <div className={styles.buttonContainer}>
        {strikeStatus == true ? (
          <button
            className={styles.button}
            onClick={() => {
              PlayAgain()
            }}
          >
            Try Again
          </button>
        ) : (
          <button
            disabled={strikeStatus}
            className={styles.button}
            onClick={handleStrike}
          >
            Strike
          </button>
        )}

        <div className={styles.count}>
          Score: {score} Round: {round}
        </div>

        <div className={styles.popup}>{popupMsg}</div>
      </div>
    </div>
  )
}

export default Game_01
