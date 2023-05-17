import { Routes, Route } from "react-router-dom";
import './App.css';
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import Layout from './pages/Layout'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/notes" element={<NotesListPage />} />
      </Route>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
