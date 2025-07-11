import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MyMCPs from './components/MyMCPs';
import EditMCP from './components/EditMCP';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <div className="flex flex-col md:flex-row flex-1">
          <Routes>
            <Route
              path="/mcps/*"
              element={
                <>
                  <Sidebar activePage="my-mcps" />
                  <Routes>
                    <Route path="my-mcps" element={<MyMCPs />} />
                    <Route path="edit/:id" element={<EditMCP />} />
                  </Routes>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/mcps/my-mcps" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;