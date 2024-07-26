// app/components/ConfirmationModal.jsx
import React from 'react';
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, language, flagSrc }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <img src={flagSrc} alt={`Flag of ${language}`} className={styles.flag} />
        <p>Vous êtes sur le point d'effacer votre progression en {language === 'en' ? 'anglais' : 'français'}. Voulez-vous continuer ?</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>Valider</button>
          <button onClick={onClose} className={styles.cancelButton}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
