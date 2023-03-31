import styles from './App.module.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch >
          <Route exact path='/' render={() => <h1>Hello World</h1>} />
          <Route exact path='/signin' render={() => <h1>Sign in</h1>} />
          <Route exact path='/signup' render={() => <h1>Sign up</h1>} />
          <Route exact path='/signout' render={() => <h1>Sign out</h1>} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;