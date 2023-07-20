import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import KeyDetails from "./pages/KeyDetails";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/my-account" element={ <MyAccount /> } /> 
          <Route path="/my-account/:keyId/details" element={ <KeyDetails /> } />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;