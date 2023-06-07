import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
    </div>
  );
}

export default App;
