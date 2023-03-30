import styles from './App.module.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <h1>Hello World</h1>
      <Footer />
    </div>
  );
}

export default App;