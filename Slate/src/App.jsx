import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Notes from "./components/Notes";
import { Toaster } from "../src/components/ui/sonner";
import NotesPage from "./components/sections/NotesPage";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notesss" element={<NotesPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
