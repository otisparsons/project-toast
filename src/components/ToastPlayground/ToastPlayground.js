import React, { useContext, useState } from 'react';
import ToastShelf from '../ToastShelf/ToastShelf';
import { ToastContext } from '../ToastProvider/ToastProvider';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

  const { createToast } = useContext(ToastContext); 

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);


  function handleCreateToast(event){
    event.preventDefault();

    createToast(message, variant);

  
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }



  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
   
    <ToastShelf  />


      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={(event) => {setMessage(event.target.value) }}/>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`
              return(
            <label key={id} htmlFor={id}>
              <input
                id={id}
                type="radio"
                name="variant"
                value={option}
                checked={option === variant}
                onChange={(event) => {
                  setVariant(event.target.value)
                }}
              />
              {option}
            </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button onClick={handleCreateToast}>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
