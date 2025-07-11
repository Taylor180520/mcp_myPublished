import React from 'react';
import { Search, Box } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <div className="flex items-center">
            <Box className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-semibold">Item Marketplace</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">AI Agents</NavLink>
            <NavLink href="#">MCP</NavLink>
            <NavLink href="#">Knowledge Base</NavLink>
            <NavLink href="#">MCP Servers</NavLink>
            <NavLink href="#">API</NavLink>
            <NavLink href="#">SaaS</NavLink>
            <NavLink href="#">RaaS</NavLink>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative w-64 hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search marketplace..."
              className="w-full px-3 py-2 pl-10 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none"
            />
          </div>
          <button className="text-gray-300 hover:text-white transition-colors text-base">Sign In</button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-base">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <a href={href} className="text-gray-300 hover:text-white transition-colors text-base">
      {children}
    </a>
  );
};

export default Header;