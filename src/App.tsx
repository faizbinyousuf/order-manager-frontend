import "./App.css";
import HomePage from "./pages/HomePage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <HomePage></HomePage>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
