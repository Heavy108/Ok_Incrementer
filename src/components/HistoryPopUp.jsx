import React from 'react';
import styles from './HistoryPopUp.module.css';

const HistoryPopUp = ({ history, onClose }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.text}>History:</h2>
        <ul className={styles.text}>
          {history.map((entry) => (
            <li className={styles.text} key={entry.id}>
              {entry.count} - {entry.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPopUp;