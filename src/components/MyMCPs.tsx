import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import MCPCard, { MCPData, MCPStatus } from './MCPCard';
import ConfirmationModal from './ConfirmationModal';

const MyMCPs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  // Filter panel toggle states
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isProviderFilterOpen, setIsProviderFilterOpen] = useState(false);
  
  // Refs for click outside detection
  const statusFilterRef = useRef<HTMLDivElement>(null);
  const providerFilterRef = useRef<HTMLDivElement>(null);
  
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
  
  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
        setIsStatusFilterOpen(false);
      }
      if (providerFilterRef.current && !providerFilterRef.current.contains(event.target as Node)) {
        setIsProviderFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
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

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatuses([]);
    setSelectedCategory('');
    setSelectedProviders([]);
    setStartDate('');
    setEndDate('');
  };

  // Handle status filter changes
  const handleStatusChange = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  // Handle provider filter changes
  const handleProviderChange = (provider: string) => {
    setSelectedProviders(prev => 
      prev.includes(provider) 
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
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
        {/* Enhanced Filters */}
        <div className="bg-primary-color rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Search MCP Servers</label>
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="Communication">Communication</option>
                <option value="Productivity">Productivity</option>
                <option value="Weather">Weather</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Developer Tools">Developer Tools</option>
              </select>
            </div>

            {/* Status Filter - Checkbox Based */}
            <div className="relative" ref={statusFilterRef}>
              <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
              <div className="relative">
                <button
                  onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none flex items-center justify-between"
                >
                  <span className="text-sm">
                    {selectedStatuses.length === 0 
                      ? 'All Status' 
                      : `${selectedStatuses.length} selected`
                    }
                  </span>
                  {isStatusFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {isStatusFilterOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {statusOptions.map((status) => (
                      <label key={status} className="flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status)}
                          onChange={() => handleStatusChange(status)}
                          className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                        />
                        <span className="text-sm text-white">{status}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Provider Filter - Checkbox Based */}
            <div className="relative" ref={providerFilterRef}>
              <label className="block text-sm font-medium text-gray-400 mb-2">Provider</label>
              <div className="relative">
                <button
                  onClick={() => setIsProviderFilterOpen(!isProviderFilterOpen)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none flex items-center justify-between"
                >
                  <span className="text-sm">
                    {selectedProviders.length === 0 
                      ? 'All Providers' 
                      : `${selectedProviders.length} selected`
                    }
                  </span>
                  {isProviderFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {isProviderFilterOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                    {providerOptions.map((provider) => (
                      <label key={provider} className="flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedProviders.includes(provider)}
                          onChange={() => handleProviderChange(provider)}
                          className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                        />
                        <span className="text-sm text-white">{provider}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second row for additional filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">From Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 pl-10 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">To Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 pl-10 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-sm text-gray-400">
                <span className="font-medium text-white">{filteredMCPs.length}</span> of {mcpData.length} MCP Servers
              </div>
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
    </div>
  );
};

export default MyMCPs; 