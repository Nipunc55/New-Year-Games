import React, { useState, useEffect } from 'react'
import Score from '../component/Score'
import styles from '../styles/Game_2.module.css'
import hitImgLeft from '../assets/images/game_2/hit-left.png'
import idleImgLeft from '../assets/images/game_2/idle-left.png'
import duckImgLeft from '../assets/images/game_2/duck-left.png'
import hitImgRight from '../assets/images/game_2/hit-right.png'
import idleImgRight from '../assets/images/game_2/idle-right.png'
import duckImgRight from '../assets/images/game_2/duck-right.png'
import GamePopUp from '../component/GameOverPopUp'

const { idle, hit, duck } = { idle: 'idle', hit: 'hit', duck: 'duck' }

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

  useEffect(() => {
    let intervalId
    let hitFrequnt = 1000
    if (!gameOver && gameStart) {
      hitFrequnt = Math.random() * 1000

      intervalId = setInterval(() => {
        setTimeout(() => {
          Hit(hitImgRight, idleImgRight, setRightPlayer, setPlayerStatusR, hit)
        }, 500)
        setTimeout(() => {
          Hit(
            duckImgRight,
            idleImgRight,
            setRightPlayer,
            setPlayerStatusR,
            duck,
            3000,
          )
        }, 1500)
      }, 2000)
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
    let timeOut = resetTime || 300
    let returnStatus = isRetun || false

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
            <img className={styles.player} src={leftPlayer} />
            <img className={styles.player} src={rightPlayer} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Game_02
