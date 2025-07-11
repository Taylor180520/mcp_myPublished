import React, { useState } from 'react';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from './Button';
import StatusBadge from './StatusBadge';
import { MCPStatus } from './MCPCard';

const EditMCP: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Weather MCP Server',
    shortDescription: 'Get real-time weather updates',
    fullDescription: 'A comprehensive weather MCP Server providing real-time updates, forecasts, and weather alerts for locations worldwide. Features include hourly and weekly forecasts, precipitation radar, and severe weather notifications.',
    category: 'Weather',
    version: '1.0.0',
    language: 'en',
    monetization: 'free',
    developerName: 'Weather Technologies Inc.',
    developerContact: 'support@weathertech.com',
    privacyPolicyUrl: 'https://weathertech.com/privacy'
  });

  // This would typically fetch the MCP Server data based on the ID
  const mcpData = {
    // MCP Server Information
    name: 'Weather MCP Server',
    language: 'en',
    monetization: 'free',
    version: '1.0.0',
    category: 'Weather',
    type: 'build',
    status: 'Auto Rejected' as MCPStatus,
    provider: 'ITEM',
    rejectionReason: 'MCP Server does not meet our security requirements. Please review our security guidelines and ensure proper authentication mechanisms are implemented.',
    
    // Market Information
    shortDescription: 'Get real-time weather updates',
    fullDescription: 'A comprehensive weather MCP Server providing real-time updates, forecasts, and weather alerts for locations worldwide. Features include hourly and weekly forecasts, precipitation radar, and severe weather notifications.',
    icon: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg',
    screenshots: [
      'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg',
      'https://images.pexels.com/photos/2096622/pexels-photo-2096622.jpeg',
      'https://images.pexels.com/photos/1785493/pexels-photo-1785493.jpeg'
    ],
    
    // Developer Information
    developerName: 'Weather Technologies Inc.',
    developerContact: 'support@weathertech.com',
    
    // File Information
    buildFile: 'weather-mcp-server-v1.0.0.tar.gz',
    buildSize: '24.5 MB',
    buildType: 'TAR.GZ',
    
    // Privacy Policy
    privacyPolicyUrl: 'https://weathertech.com/privacy',
    privacyPolicyFile: 'privacy-policy-v1.pdf',
    
    // Timestamps
    createdAt: '2024-03-15',
    lastUpdated: '2024-03-20',
    submittedDate: '2024-03-21'
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Here you would typically save the changes to the backend
    console.log('Saving changes:', formData);
    setIsEditMode(false);
    // You might want to show a success message here
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: mcpData.name,
      shortDescription: mcpData.shortDescription,
      fullDescription: mcpData.fullDescription,
      category: mcpData.category,
      version: mcpData.version,
      language: mcpData.language,
      monetization: mcpData.monetization,
      developerName: mcpData.developerName,
      developerContact: mcpData.developerContact,
      privacyPolicyUrl: mcpData.privacyPolicyUrl
    });
    setIsEditMode(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/mcps/my-mcps')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-white">MCP Server Details</h1>
        </div>
        <div className="flex items-center gap-3">
          {isEditMode ? (
            <>
              <Button variant="secondary" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit MCP Server
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* MCP Server Information */}
          <section className="bg-primary-color rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">MCP Server Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">MCP Server Name</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-white">{mcpData.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                {isEditMode ? (
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                ) : (
                  <p className="text-white capitalize">{mcpData.language === 'en' ? 'English' : mcpData.language}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Version</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => handleInputChange('version', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-white">{mcpData.version}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                {isEditMode ? (
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Weather">Weather</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Communication">Communication</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Developer Tools">Developer Tools</option>
                  </select>
                ) : (
                  <p className="text-white">{mcpData.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                <p className="text-white capitalize">{mcpData.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Provider</label>
                <p className="text-white">{mcpData.provider}</p>
              </div>
            </div>
          </section>

          {/* Market Information */}
          <section className="bg-primary-color rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Market Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Short Description</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-white">{mcpData.shortDescription}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Description</label>
                {isEditMode ? (
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none resize-none"
                  />
                ) : (
                  <p className="text-white">{mcpData.fullDescription}</p>
                )}
              </div>
            </div>
          </section>

          {/* Developer Information */}
          <section className="bg-primary-color rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Developer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Developer Name</label>
                {isEditMode ? (
                  <input
                    type="text"
                    value={formData.developerName}
                    onChange={(e) => handleInputChange('developerName', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-white">{mcpData.developerName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Contact Email</label>
                {isEditMode ? (
                  <input
                    type="email"
                    value={formData.developerContact}
                    onChange={(e) => handleInputChange('developerContact', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                  />
                ) : (
                  <p className="text-white">{mcpData.developerContact}</p>
                )}
              </div>
            </div>
          </section>

          {/* File Information */}
          <section className="bg-primary-color rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">File Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Build File</label>
                <p className="text-white">{mcpData.buildFile}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">File Size</label>
                <p className="text-white">{mcpData.buildSize}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">File Type</label>
                <p className="text-white">{mcpData.buildType}</p>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section className="bg-primary-color rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Privacy Policy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Privacy Policy URL</label>
                {isEditMode ? (
                  <input
                    type="url"
                    value={formData.privacyPolicyUrl}
                    onChange={(e) => handleInputChange('privacyPolicyUrl', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                  />
                ) : (
                  <a href={mcpData.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                    {mcpData.privacyPolicyUrl}
                  </a>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Privacy Policy File</label>
                <p className="text-white">{mcpData.privacyPolicyFile}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* MCP Server Icon */}
          <div className="bg-primary-color rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">MCP Server Icon</h3>
            <img 
              src={mcpData.icon} 
              alt={mcpData.name} 
              className="w-32 h-32 rounded-lg object-cover mx-auto"
            />
          </div>

          {/* Screenshots */}
          <div className="bg-primary-color rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Screenshots</h3>
            <div className="grid grid-cols-2 gap-2">
              {mcpData.screenshots.map((screenshot, index) => (
                <img 
                  key={index}
                  src={screenshot} 
                  alt={`Screenshot ${index + 1}`} 
                  className="w-full h-24 rounded object-cover"
                />
              ))}
            </div>
          </div>

          {/* Status & Timestamps */}
          <div className="bg-primary-color rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">Status & Timeline</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                <StatusBadge status={mcpData.status} />
              </div>
              
              {(mcpData.status === 'Rejected' || mcpData.status === 'Auto Rejected') && mcpData.rejectionReason && (
                <div className="mt-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                  <p className="text-red-400 text-sm font-medium mb-1">Rejection Reason:</p>
                  <p className="text-red-300 text-sm">{mcpData.rejectionReason}</p>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-400">Version:</span>
                <span className="text-white">{mcpData.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Created:</span>
                <span className="text-white text-sm">{formatDateTime(mcpData.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Submitted:</span>
                <span className="text-white text-sm">{formatDateTime(mcpData.submittedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Updated:</span>
                <span className="text-white text-sm">{formatDateTime(mcpData.lastUpdated)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMCP; 