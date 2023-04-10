import React, { useState } from 'react'
import styles from '../styles/Score.module.css'
/**
 *
 * @param {strikeStatus,PlayAgain,HandleStrike,score,popup,popupMsg} props
 * @returns
 */
function Score(props) {
  const [score, setScore] = useState()
  const [round, setRound] = useState()

  return (
    <>
      {' '}
      <div className={styles.buttonContainer}>
        {props.strikeButton == true ? (
          <>
            {' '}
            {props.strikeStatus == true ? (
              <button
                className={styles.button}
                onClick={() => {
                  props.PlayAgain()
                }}
              >
                Try Again
              </button>
            ) : (
              <button
                disabled={props.strikeStatus}
                className={styles.button}
                onClick={() => {
                  props.HandleStrike()
                }}
              >
                Strike
              </button>
            )}
          </>
        ) : null}

        <div className={styles.scoreCover}>
          <div className={styles.count}>
            Score: {props.score} Round: {props.round}
          </div>
        </div>
        <div className={styles.popup}>{props.popupMsg}</div>
      </div>
    </>
  )
}

export default Score
