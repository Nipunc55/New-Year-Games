import React, { useState, useEffect } from 'react'
import Score from '../component/Score'
import styles from '../styles/Game_2.module.css'
import hitImgLeft from '../assets/images/game_2/hit-left.webp'
import idleImgLeft from '../assets/images/game_2/idle-left.webp'
import duckImgLeft from '../assets/images/game_2/duck-left.webp'
import hitImgRight from '../assets/images/game_2/hit-right.webp'
import idleImgRight from '../assets/images/game_2/idle-right.webp'
import duckImgRight from '../assets/images/game_2/duck-right.webp'
import GamePopUp from '../component/GameOverPopUp'
import LoadingBar from '../component/LoadingBar'

const { idle, hit, duck } = { idle: 'idle', hit: 'hit', duck: 'duck' }
const timeIntervals = [1500, 2000, 3000, 2500]

function Game_02() {
  const [leftPlayer, setLeftPlayer] = useState(idleImgLeft)
  const [rightPlayer, setRightPlayer] = useState(idleImgRight)
  const [leftPlayerState, setPlayerStatusL] = useState(idle)
  const [rightPlayerState, setPlayerStatusR] = useState(idle)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  const [gameOverMassage, setGameOverMassage] = useState('')
  const [isDuckPressed, setIsPressed] = useState(false)
  function SendResult() {
    let result = { score: score, gameID: 2 }
    let resultString = JSON.stringify(result)
    // Send message to parent window
    window.parent.postMessage(resultString, '*')
  }
  useEffect(() => {
    let intervalId
    let hitFrequnt =
      timeIntervals[Math.floor(Math.random() * timeIntervals.length)]
    console.log('uvgucv')
    if (!gameOver && gameStart) {
      // hitFrequnt = Math.random() * 1000
      console.log()
      intervalId = setInterval(() => {
        hitFrequnt =
          timeIntervals[Math.floor(Math.random() * timeIntervals.length)]
        console.log(hitFrequnt)

        setTimeout(() => {
          Hit(hitImgRight, idleImgRight, setRightPlayer, setPlayerStatusR, hit)
        }, 0)
        setTimeout(() => {
          Hit(
            duckImgRight,
            idleImgRight,
            setRightPlayer,
            setPlayerStatusR,
            duck,
            3000,
            true,
          )
        }, 400)
      }, hitFrequnt)
    } else {
      clearInterval(intervalId)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [gameStart, gameOver])
  useEffect(() => {
    if (round < 1) {
      setGameOverMassage('Game Over')
      setGameOver(true)
      setGameStart(false)
    }
  }, [round])

  useEffect(() => {
    {
      if (score > 900 && !gameOver) {
        setGameOverMassage('You Won')
        setGameOver(true)
        setGameStart(false)
      }
    }
  }, [score])

  useEffect(() => {
    if (leftPlayerState != rightPlayerState) {
      if (leftPlayerState == idle && rightPlayerState == hit) {
        setRound((preRound) => preRound - 1)
      }
      if (leftPlayerState == hit && rightPlayerState == idle) {
        setScore((prevScore) => prevScore + 100)
      }
    }
  }, [leftPlayerState, rightPlayerState])

  const HandleStrike = () => {
    Hit(hitImgLeft, idleImgLeft, setLeftPlayer, setPlayerStatusL, hit, null)
  }
  const DuckPlayer = () => {
    Hit(duckImgLeft, idleImgLeft, setLeftPlayer, setPlayerStatusL, duck, null)
  }
  useEffect(() => {
    Hit(
      duckImgLeft,
      idleImgLeft,
      setLeftPlayer,
      setPlayerStatusL,
      duck,
      0,
      isDuckPressed,
    )
    return () => {}
  }, [isDuckPressed])

  const Hit = (
    hitImg,
    idleImg,
    setPlayer,
    setStatus,
    status,
    resetTime,
    isRetun,
  ) => {
    let timeOut = resetTime ?? 300
    let returnStatus = isRetun ?? false

    setStatus(status)
    setPlayer(hitImg)
    if (!returnStatus) {
      setTimeout(() => {
        setPlayer(idleImg)
        setStatus(idle)
      }, timeOut)
    }
  }
  const Restart = () => {
    setGameOver(false)
    setGameStart(true)
    setScore(0)
    setRound(10)
  }
  return (
    <>
      <div className={styles.container}>
        <Score
          strikeStatus={false}
          HandleStrike={HandleStrike}
          score={score}
          round={round}
        />
        <LoadingBar life={round} enemy={score} />
        <GamePopUp
          show={gameOver}
          score={score}
          status={gameOverMassage}
          resetButton={Restart}
        />
        <div className={styles.gameWindow}>
          <div className={styles.gameBack}>
            {' '}
            <div className={styles.buttonContainer}>
              {gameStart != true ? (
                <button disabled={gameStart} onClick={() => setGameStart(true)}>
                  Play
                </button>
              ) : (
                <>
                  <button
                    className={styles.controllerButtons}
                    onClick={HandleStrike}
                  >
                    Hit
                  </button>
                  <button
                    onTouchStart={() => setIsPressed(true)}
                    onTouchEnd={() => setIsPressed(false)}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setIsPressed(false)}
                    // onMouseLeave={() => setIsPressed(false)}
                  >
                    Duck
                  </button>
                </>
              )}
            </div>
            <img
              className={`${styles.player} ${styles.playerLeft}`}
              src={leftPlayer}
            />
            <img
              className={`${styles.player} ${styles.playerRight}`}
              src={rightPlayer}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Game_02
