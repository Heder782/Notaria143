// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Layout/sidebar';
import Login from './components/Auth/login';
import DocumentForm from './components/Document/documentForm';
import DocumentPreview from './components/Document/documentPreview';
import UserManagement from './components/Admin/userManagement';
import LoginSelector from './components/Auth/loginSelector'; 
import './style.css';
import Membretado from './components/Layout/membretado';
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('selector');
  const [documentData, setDocumentData] = useState(null);
  const [qrCode, setQrCode] = useState('');

  const handleLogin = (credentials, userType) => {
    // Aquí implementarías la lógica real de autenticación
    setCurrentUser({ username: credentials.username, type: userType });
    setCurrentView(userType === 'admin' ? 'admin' : 'document');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('selector'); 
  };

  const handleGenerateDocument = (data) => {
    setDocumentData(data);
    setCurrentView('preview');
    // Aquí generarías el QR code
  };

  const handleSaveToDrive = async () => {
    // Implementar subida a Google Drive
    try {
      const driveService = await import('./services/drive');
      const fileId = await driveService.uploadDocument(documentData);
      console.log('Documento subido con ID:', fileId);
    } catch (error) {
      console.error('Error subiendo a Drive:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (

    <div className="app">
      {currentUser && <Membretado/>}
      {currentUser ? (
        <div className="app-container">
          <Sidebar 
            user={currentUser} 
            onLogout={handleLogout}
            onViewChange={setCurrentView}
          />
          
          <div className="main-content">
            {currentView === 'document' && (
  <DocumentForm 
    onSubmit={handleGenerateDocument} 
    onBack={() => {
      setCurrentUser(null);        // 👈 cerrar sesión
      setCurrentView('selector');  // 👈 regresar al inicio
    }} 
  />
)}
            
            {currentView === 'preview' && (
              <DocumentPreview
                documentData={documentData}
                qrCode={qrCode}
                onEdit={() => setCurrentView('document')}
                onPrint={handlePrint}
                onSave={handleSaveToDrive}
              />
            )}
            
            {currentView === 'admin' && (
              <UserManagement />
            )}
          </div>
        </div>
      ) : (
        
        <div className="login-screen">
          {currentView === 'selector' && (
            <LoginSelector onSelectUserType={(type) => setCurrentView(`${type}-login`)} />
          )}
          
          {currentView === 'admin-login' && (
            <Login onLogin={handleLogin} userType="admin"
            onBack={()=> setCurrentView('selector')}
             />
          )}
          
          {currentView === 'empleado-login' && (
            <Login onLogin={handleLogin}
             userType="empleado"
             onBack={() => setCurrentView('selector')} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;