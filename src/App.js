import { Toaster } from "react-hot-toast";
import "./App.css";
import Router from "./routes/routes";

function App() {
  return (
    <>
      <Router />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
