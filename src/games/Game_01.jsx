import React, { useRef, useState, useEffect } from 'react'
import styles from '../styles/Game_1.module.css'
import destroyedTargetImage from '../assets/images/game_1/pot2.webp'
import candyPotImage from '../assets/images/game_1/pot-candy.webp'
import targetImage from '../assets/images/game_1/pot1.webp'
import GamePopUp from '../component/GameOverPopUp'
import Score from '../component/Score'

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
  //screen rotation function
  useEffect(() => {
    // const handleOrientationChange = () => {
    //   if (screen.orientation.angle === 90 || screen.orientation.angle === -90) {
    //     // Rotate the screen to portrait orientation
    //     screen.orientation.lock('portrait')
    //   } else {
    //     // Rotate the screen to landscape orientation
    //     screen.orientation.lock('landscape')
    //   }
    // }
    // // Add an event listener to detect changes in orientation
    // window.addEventListener('orientationchange', handleOrientationChange)
    // // Lock the screen to landscape orientation on mount
    // screen.orientation.lock('landscape')
    // // Remove the event listener on unmount
    // return () => {
    //   window.removeEventListener('orientationchange', handleOrientationChange)
    // }
    // Check if the screen width is less than 768 pixels
    // if (window.matchMedia('(max-width: 768px)').matches) {
    //   try {
    //     if (document.fullscreenEnabled) {
    //       if (document.fullscreenElement === null) {
    //         document.documentElement.requestFullscreen()
    //       } else {
    //         document.exitFullscreen()
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // if (typeof screen.orientation !== 'undefined') {
    //   // screen.orientation
    //   //   .lock('landscape')
    //   //   .then(function () {
    //   //     console.log('locked')
    //   //   })
    //   //   .catch(function (error) {
    //   //     console.log('not working')
    //   //   })
    //   // screen.orientation API is supported
    // } else {
    //   // screen.orientation API is not supported
    // }
    // if (!screen.orientation) {
    //   // Unlock the screen orientation before locking it
    //   screen.orientation
    //     .unlock()
    //     .then(() => {
    //       // screen.orientation.lock('landscape')
    //       // Lock the screen orientation to landscape on mobile devices
    //       if (/Mobi/.test(navigator.userAgent)) {
    //         screen.orientation.lock('landscape')
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Failed to unlock screen orientation:', error)
    //     })
    // } else {
    //   console.error('Screen orientation API is not supported')
    // }
    //}
  }, [])

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
  const fullScreen = () => {
    try {
      if (document.fullscreenEnabled) {
        if (document.fullscreenElement === null) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="container" className={styles.App}>
      <div className={styles.container}>
        <GamePopUp show={gameOver} score={score} resetButton={ResatrtGame} />

        <img src={image} alt="" className={styles.target} id={styles.target1} />
        <img src={image} alt="" className={styles.target} id={styles.target2} />
        <img src={image} alt="" className={styles.target} id={styles.target3} />
        <img src={image} alt="" className={styles.target} id={styles.target4} />
        <div className={styles.hammer} id={styles.hammer}></div>
      </div>
      <Score
        strikeButton={true}
        strikeStatus={strikeStatus}
        PlayAgain={PlayAgain}
        HandleStrike={handleStrike}
        score={score}
        round={round}
      />
      <button className={styles.fullScreenButton} onClick={fullScreen}>
        Full Screen
      </button>
    </div>
  )
}

export default Game_01
