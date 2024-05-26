import "./layout.scss";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./routes/home/HomePage";

function App() {
  return (
    <div className="layout">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
