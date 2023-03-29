import React, { useRef, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import styles from '../styles/App.module.css'
import destroyedTargetImage from '../assets/images/pot2.png'
import targetImage from '../assets/images/pot1.png'

function Game_01() {
  const [image, setImage] = useState(targetImage)
  const [destroyedImage, setDesImage] = useState('')
  const [hammerPosition, setHammerPosition] = useState(0)
  const [hammerElement, setHammerElement] = useState()
  const [score, setScore] = useState(0)
  const [popupMsg, SetPoupMassage] = useState()

  const ref = useRef()
  const openPopup = () => ref.current.open()
  const closePopup = () => ref.current.close()

  useEffect(() => {}, [])
  function getCurrentPosition(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return matrix.m41 // the current X position of the element
  }

  const handleStrike = () => {
    console.log('striked clicked')
    const hammer = document.getElementById(styles.hammer)
    const targets = document.querySelectorAll(`.${styles.target}`)
    const hammerPosition = getCurrentPosition(hammer)

    PlayStrikeAnimation(hammer, hammerPosition)

    targets.forEach((element, index) => {
      if (
        hammerPosition >= element.offsetLeft &&
        hammerPosition <= element.offsetLeft + element.offsetWidth
      ) {
        const result = CheckResult(index)

        openPopup()

        if (result) {
          setScore((prevScore) => prevScore + 1)

          SetPoupMassage('you Won!')
        } else {
          SetPoupMassage('you Lost! Try again')
        }

        ChangeImage(element)

        StopAnimation(hammer)
        setHammerElement(hammer)
        return
      }
    })
  }
  const PlayStrikeAnimation = (element, position) => {
    element.style.left = position
  }
  const ResatrtGame = () => {
    const targets = document.querySelectorAll(`.${styles.target}`)
    targets.forEach((element) => {
      element.src = targetImage
    })
    if (hammerElement != null) {
      hammerElement.style.animationPlayState = ''
    }

    setImage(targetImage)
    closePopup()
    setScore(0)
  }
  const StopAnimation = (element) => {
    element.style.animationPlayState = 'paused'
  }
  const ChangeImage = (element) => {
    setDesImage(destroyedTargetImage)
    element.src = destroyedTargetImage
  }
  const CheckResult = (number) => {
    let randomNum = Math.floor(Math.random() * 4)
    if (number == randomNum) return true
    return false
  }

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Popup ref={ref}>
          <div>{popupMsg}</div>
        </Popup>
        <img src={image} alt="" className={styles.target} id={styles.target1} />
        <img src={image} alt="" className={styles.target} id={styles.target2} />
        <img src={image} alt="" className={styles.target} id={styles.target3} />
        <img src={image} alt="" className={styles.target} id={styles.target4} />
        <div className={styles.hammer} id={styles.hammer}></div>
      </div>
      <button className={styles.button} onClick={handleStrike}>
        Strike
      </button>

      <button className={styles.button} onClick={ResatrtGame}>
        Try Again
      </button>
      <div className={styles.score}>Score: {score}</div>
    </div>
  )
}

export default Game_01
