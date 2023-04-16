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
import PostDetail from './pages/posts/PostDetail';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';
import ProfileDetail from './pages/profiles/ProfileDetail';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProfileList from './pages/profiles/ProfileList';

function App() {
  const currentUser = useCurrentUser()
  const profile_id = currentUser?.profile_id || ''

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch >
          <Route exact path='/' render={() => (
            <PostsList
              message={'No results found'}
            />
          )}
          />
          <Route exact path='/users' render={() => (
            <ProfileList />
          )}
          />
          <Route exact path='/liked' render={() => (
            <PostsList
              message={'No results found'}
              filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
            />
          )}
          />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/signout' render={() => <h1>Sign out</h1>} />
          <Route exact path='/posts/create' render={() => <PostCreateForm />} />
          <Route exact path='/posts/:id/edit' render={() => <PostEditForm />} />
          <Route exact path='/posts/:id' render={() => <PostDetail />} />
          <Route exact path='/profiles/:id' render={() => <ProfileDetail />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Container>
      <Footer />
    </div>

  );
}

export default App;