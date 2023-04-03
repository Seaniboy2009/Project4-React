
import React from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import styles from "../styles/Asset.module.css";

// const Asset = ({ spinner, srcAlike, srcNotAlike, message, messageAlike, messageNotAlike }) => {
//     return (
//         <div className={`${styles.Asset}`}>
//             {spinner && <Spinner animation="border" />}
//             {
//                 <>
//                     <Container>
//                         <Row>
//                             <Col>
//                                 {messageAlike &&
//                                     <p className={`${styles.Alike} mt-4`}>
//                                         {messageAlike}
//                                     </p>
//                                 }
//                                 {srcAlike &&
//                                     <img className={styles.AlikeImage}
//                                         src={srcAlike}
//                                         alt={messageAlike}
//                                         width={200}
//                                     />
//                                 }
//                             </Col>
//                             <Col>
//                                 {messageNotAlike &&
//                                     <p className={`${styles.NotAlike} mt-4`}>
//                                         {messageNotAlike}
//                                     </p>
//                                 }
//                                 {srcNotAlike &&
//                                     <img
//                                         className={styles.NotAlikeImage}
//                                         src={srcNotAlike}
//                                         alt={messageNotAlike}
//                                         width={200}
//                                     />
//                                 }
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <p>{message}</p>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </>
//             }
//         </div>
//     );
// };

const Asset = ({ spinner, src, message }) => {
    return (
      <div className={`${styles.Asset} p-4`}>
        {spinner && <Spinner animation="border" />}
        {src && <img src={src} alt={message} />}
        {message && <p className="mt-4">{message}</p>}
      </div>
    );
  };

export default Asset;