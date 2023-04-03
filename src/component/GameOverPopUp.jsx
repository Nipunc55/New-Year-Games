import { useState, useEffect } from 'react'
import styles from '../styles/PopUp.module.css'

function GamePopUp(props) {
  const [showPopUp, setShowPoUp] = useState()
  useEffect(() => {
    setShowPoUp(props.show)
  }, [props])

  return (
    <>
      {showPopUp == true ? (
        <>
          {' '}
          <div className={styles.popupContainer} id="popup">
            <div className={styles.popup}>
              <h1>{props.status}</h1>
              <h2>Your score</h2>
              <p>
                {props.score}
                <span id="score"></span>
              </p>
              <button
                id="restart-btn-popup"
                onClick={() => {
                  setShowPoUp(false)
                  props.resetButton()
                }}
              >
                PlayAgain
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default GamePopUp
