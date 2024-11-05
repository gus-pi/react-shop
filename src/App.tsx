import 'bootstrap/dist/css/bootstrap.min.css';
import { Footer, NavBar } from './components/layout';
import Home from './pages/Home';

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <Footer />
    </>
  );
}

export default App;
