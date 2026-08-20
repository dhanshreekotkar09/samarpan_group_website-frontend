import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import ContactPage from './components/Contact';
import ProjectsPage from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import HomePage from './components/Home';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminProjects from './admin/AdminProjects';
import AdminProjectForm from './admin/AdminProjectForm';
import PageTitle from './components/PageTitle';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <PageTitle />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/projects" replace />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectForm />} />
          <Route path="projects/:id" element={<AdminProjectForm />} />
        </Route>
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
