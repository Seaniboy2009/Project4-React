import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message, alike, notAlike}) => {
    return (
      <div className={`${styles.Asset} p-4`}>
        {spinner && <Spinner animation="border" />}
        {src && <img src={src} alt={message} width={250}/>}
        {message && alike && <p className={styles.Alike}>{message}</p>}
        {message && notAlike && <p className={styles.NotAlike}>{message}</p>}
      </div>
    );
  };

export default Asset;