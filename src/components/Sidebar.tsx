import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  return (
    <div className="w-64 bg-primary-color border-r border-gray-700 p-6">
      <h3 className="text-gray-400 text-sm font-medium mb-4">MCP Server Market</h3>
      
      <nav className="space-y-2">
        <NavLink
          to="/mcps/my-mcps"
          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activePage === 'my-mcps'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          My MCP Servers
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;