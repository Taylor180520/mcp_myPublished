import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import MCPCard, { MCPData, MCPStatus } from './MCPCard';
import ConfirmationModal from './ConfirmationModal';

const MyMCPs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Temporary filter states for modal
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState<string[]>([]);
  const [tempSelectedCategory, setTempSelectedCategory] = useState<string>('');
  const [tempSelectedProviders, setTempSelectedProviders] = useState<string[]>([]);
  
  // Filter options
  const statusOptions = [
    'Not Submitted',
    'Pending',
    'Auto Approved',
    'Published',
    'Rejected',
    'Auto Rejected',
    'Delisted'
  ];
  
  const providerOptions = ['ITEM', 'Individual'];
  
  const categoryOptions = ['Communication', 'Productivity', 'Weather', 'Utilities', 'Entertainment', 'Developer Tools'];
  
  const mcpData: MCPData[] = [
    {
      id: 1,
      name: 'Team Chat Server',
      description: 'Real-time team communication MCP Server with advanced features.',
      image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'Not Submitted',
      submittedDate: '2024-03-15',
      createdAt: '2024-03-10',
      type: 'build',
      category: 'Communication',
      provider: 'ITEM'
    },
    {
      id: 2,
      name: 'Task Manager Server',
      description: 'Organize and track your daily tasks efficiently with smart automation.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'Pending',
      submittedDate: '2024-03-10',
      createdAt: '2024-03-05',
      type: 'store',
      category: 'Productivity',
      provider: 'Individual'
    },
    {
      id: 3,
      name: 'Weather MCP Server',
      description: 'Real-time weather updates and forecasts with detailed analytics.',
      image: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'Auto Rejected',
      submittedDate: '2024-03-12',
      createdAt: '2024-03-08',
      rejectionReason: 'MCP Server does not meet our security requirements. Please review our security guidelines and ensure proper authentication mechanisms are implemented.',
      type: 'build',
      category: 'Weather',
      provider: 'ITEM'
    },
    {
      id: 4,
      name: 'Note Taking Server',
      description: 'Simple and elegant note-taking MCP Server with cloud sync.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'Rejected',
      submittedDate: '2024-03-14',
      createdAt: '2024-03-07',
      rejectionReason: 'Missing required privacy policy documentation. Please include a comprehensive privacy policy that addresses data collection, storage, and user rights.',
      type: 'store',
      category: 'Productivity',
      provider: 'Individual'
    },
    {
      id: 5,
      name: 'Calendar Pro Server',
      description: 'Advanced calendar and scheduling MCP Server with team collaboration.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'Auto Approved',
      submittedDate: '2024-03-13',
      createdAt: '2024-03-09',
      type: 'build',
      category: 'Productivity',
      provider: 'ITEM'
    },
    {
      id: 6,
      name: 'File Manager Server',
      description: 'Efficient file organization and management with advanced search capabilities.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'Published',
      submittedDate: '2024-03-11',
      createdAt: '2024-03-06',
      type: 'store',
      category: 'Utilities',
      provider: 'ITEM'
    },
    {
      id: 7,
      name: 'Music Player Server',
      description: 'Stream and manage your music collection with high-quality audio.',
      image: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'Delisted',
      submittedDate: '2024-03-09',
      createdAt: '2024-03-04',
      type: 'store',
      delistedReason: 'MCP Server has been delisted due to reported performance issues and user complaints. Please address the performance concerns, optimize the code, and resubmit for review.',
      category: 'Entertainment',
      provider: 'Individual'
    },
    {
      id: 8,
      name: 'Database Connector Server',
      description: 'Secure database connectivity with multiple database support.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      status: 'Published',
      submittedDate: '2024-03-08',
      createdAt: '2024-03-03',
      type: 'build',
      category: 'Developer Tools',
      provider: 'ITEM'
    }
  ];

  // Enhanced filtering logic with fuzzy search
  const filteredMCPs = mcpData.filter(mcp => {
    // Fuzzy search implementation
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = mcp.name.toLowerCase().includes(searchLower);
    const descriptionMatch = mcp.description.toLowerCase().includes(searchLower);
    const categoryMatch = mcp.category?.toLowerCase().includes(searchLower);
    const matchesSearch = !searchQuery || nameMatch || descriptionMatch || categoryMatch;
    
    // Filter matches
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(mcp.status);
    const matchesCategory = !selectedCategory || mcp.category === selectedCategory;
    const matchesProvider = selectedProviders.length === 0 || (mcp.provider && selectedProviders.includes(mcp.provider));
    
    // Date range filtering
    const submittedDateObj = new Date(mcp.submittedDate);
    const matchesStartDate = !startDate || submittedDateObj >= new Date(startDate);
    const matchesEndDate = !endDate || submittedDateObj <= new Date(endDate);
    
    return matchesSearch && matchesStatus && matchesCategory && matchesProvider && matchesStartDate && matchesEndDate;
  });

  // Open filter modal and set temporary states
  const openFilterModal = () => {
    setTempSelectedStatuses([...selectedStatuses]);
    setTempSelectedCategory(selectedCategory);
    setTempSelectedProviders([...selectedProviders]);
    setIsFilterModalOpen(true);
  };

  // Apply filters from modal
  const applyFilters = () => {
    setSelectedStatuses([...tempSelectedStatuses]);
    setSelectedCategory(tempSelectedCategory);
    setSelectedProviders([...tempSelectedProviders]);
    setIsFilterModalOpen(false);
  };

  // Cancel filter changes
  const cancelFilters = () => {
    setIsFilterModalOpen(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatuses([]);
    setSelectedCategory('');
    setSelectedProviders([]);
    setStartDate('');
    setEndDate('');
    setTempSelectedStatuses([]);
    setTempSelectedCategory('');
    setTempSelectedProviders([]);
  };

  // Handle temporary status filter changes
  const handleTempStatusChange = (status: string) => {
    setTempSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  // Handle temporary provider filter changes
  const handleTempProviderChange = (provider: string) => {
    setTempSelectedProviders(prev => 
      prev.includes(provider) 
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  // Handle temporary category filter changes
  const handleTempCategoryChange = (category: string) => {
    setTempSelectedCategory(prev => prev === category ? '' : category);
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedStatuses.length > 0 || selectedCategory || selectedProviders.length > 0 || startDate || endDate;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My MCP Servers</h1>
          <p className="text-base text-gray-400">Manage and monitor your MCP Servers</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <div className="px-4 py-2 rounded-lg font-medium transition-colors text-base bg-purple-600 text-white">
          My Published
        </div>
      </div>

      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="bg-primary-color rounded-xl p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, description, or category..."
                  className="w-full px-3 py-2 pl-10 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>
            
            {/* Filter Button */}
            <button
              onClick={openFilterModal}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-purple-800 text-xs px-2 py-1 rounded-full">
                  {(selectedStatuses.length + (selectedCategory ? 1 : 0) + selectedProviders.length)}
                </span>
              )}
            </button>
            
            {/* Results Count */}
            <div className="text-sm text-gray-400">
              <span className="font-medium text-white">{filteredMCPs.length}</span> of {mcpData.length} MCP Servers
            </div>
          </div>
        </div>

        {/* MCP Server Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMCPs.length > 0 ? (
            filteredMCPs.map((mcp) => (
              <MCPCard key={mcp.id} mcp={mcp} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No MCP Servers found</div>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-md border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Filter Options</h2>
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {/* Status Filters */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Status</h3>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <label key={status} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800">
                      <span className="text-white font-medium">{status}</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={tempSelectedStatuses.includes(status)}
                          onChange={() => handleTempStatusChange(status)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          tempSelectedStatuses.includes(status)
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-gray-500'
                        }`}>
                          {tempSelectedStatuses.includes(status) && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filters */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Category</h3>
                <div className="space-y-2">
                  {categoryOptions.map((category) => (
                    <label key={category} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800">
                      <span className="text-white font-medium">{category}</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={tempSelectedCategory === category}
                          onChange={() => handleTempCategoryChange(category)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          tempSelectedCategory === category
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-gray-500'
                        }`}>
                          {tempSelectedCategory === category && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Provider Filters */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Provider</h3>
                <div className="space-y-2">
                  {providerOptions.map((provider) => (
                    <label key={provider} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800">
                      <span className="text-white font-medium">{provider}</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={tempSelectedProviders.includes(provider)}
                          onChange={() => handleTempProviderChange(provider)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          tempSelectedProviders.includes(provider)
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-gray-500'
                        }`}>
                          {tempSelectedProviders.includes(provider) && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700 space-y-3">
              <button
                onClick={applyFilters}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                Apply Filters
              </button>
              <p className="text-center text-gray-400 text-sm">Click outside to apply filters</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMCPs;