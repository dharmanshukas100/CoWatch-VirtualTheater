import './App.css';
import Navbar from './component/navbar';
import Home from './component/homepg';
import Footer from './component/footer';
import SignUp from './component/Userregister';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
      <Footer/>
      <SignUp/>


    </div>
  );
}

export default App;
