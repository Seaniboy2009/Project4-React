import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import styles from './App.module.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults';

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// context object for passing the signed in user
export const SignedInUserContext = createContext();
// Context object for setting the signed in user
export const SetSignedInUserContext = createContext();

function App() {
  // Current user and set the current user state
  const [signedInUser, setSignedInUser] = useState(null)

  // Get the current user and then set signed in user state
  const handleMount = async () => {
    try {
      const { data } = await axios.get('dj-rest-auth/user/')
      setSignedInUser(data);
      console.log(data);

    } catch (error) {
      console.log(error)
    }
  }

  // wait until the component has mounted then run function
  useEffect(() => {
    handleMount();
  }, [])

  return (
    <SignedInUserContext.Provider value={signedInUser}>
      <SetSignedInUserContext.Provider value={setSignedInUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch >
              <Route exact path='/' render={() => <h1>Hello World</h1>} />
              <Route exact path='/signin' render={() => <SignInForm />} />
              <Route exact path='/signup' render={() => <SignUpForm />} />
              <Route exact path='/signout' render={() => <h1>Sign out</h1>} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </Container>
          <Footer />
        </div>
      </SetSignedInUserContext.Provider>
    </SignedInUserContext.Provider>
  );
}

export default App;