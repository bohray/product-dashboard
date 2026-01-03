import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
