
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, srcAlike, srcNotAlike, message, messageAlike, messageNotAlike }) => {
    return (
        <div className={`${styles.Asset}`}>
            {spinner && <Spinner animation="border" />}
            {
                <>
                    <Container>
                        {srcAlike && <img className={styles.AlikeImage} src={srcAlike} alt={messageAlike} width={200} />}
                        {srcNotAlike && <img className={styles.NotAlikeImage} src={srcNotAlike} alt={messageNotAlike} width={200} />}
                    </Container>
                    <Container>
                        {messageAlike && <p className={`${styles.Alike} mt-4`}>{messageAlike}</p>}
                        {messageNotAlike && <p className={`${styles.NotAlike} mt-4`}>{messageNotAlike}</p>}
                    </Container>
                </>
            }
        </div>
    );
};

export default Asset;