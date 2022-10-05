import "./App.css";
import { Routing } from "./routes/Routing";
import { ProvideAuth } from "./components/authentication/AuthSetUp";

function App() {
  return (
    <ProvideAuth>
      <Routing />
    </ProvideAuth>
  );
}

export default App;
