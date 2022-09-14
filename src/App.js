import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <div data-theme="cupcake">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
