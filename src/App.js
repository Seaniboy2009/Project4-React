import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import styles from './App.module.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostsList from './pages/posts/PostsList';

function App() {

  return (

    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch >
          <Route exact path='/' render={() => <h1>Hello World</h1>} />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/signout' render={() => <h1>Sign out</h1>} />
          <Route exact path='/post/create' render={() => <PostCreateForm />} />
          <Route exact path='/posts' render={() => <PostsList />} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Container>
      <Footer />
    </div>

  );
}

export default App;