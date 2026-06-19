import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FileViewer } from './components/FileViewer';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Redirect root URL to about.md */}
        <Route path="/" element={<Navigate to="/about" replace />} />
        
        {/* Map filesystem routes to the dispatcher */}
        <Route path="/about" element={<FileViewer />} />
        <Route path="/skills" element={<FileViewer />} />
        <Route path="/projects" element={<FileViewer />} />
        <Route path="/projects/:projectName" element={<FileViewer />} />
        <Route path="/achievements" element={<FileViewer />} />
        <Route path="/resume" element={<FileViewer />} />
        <Route path="/contact" element={<FileViewer />} />
        
        {/* Handle invalid links by matching them dynamically inside the file manager */}
        <Route path="*" element={<FileViewer />} />
      </Routes>
    </Layout>
  );
}

export default App;
