import React, { useState } from 'react';
import { Edit, Send, Trash2, XCircle, AlertCircle, Package, Globe, Building, User, Tag } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';

export type MCPStatus = 
  | 'Not Submitted' 
  | 'Pending' 
  | 'Auto Approved'
  | 'Published'
  | 'Auto Rejected' 
  | 'Rejected'
  | 'Delisted';

export interface MCPData {
  id: number;
  name: string;
  description: string;
  image: string;
  status: MCPStatus;
  submittedDate: string;
  createdAt: string;
  type?: 'build' | 'store';
  rejectionReason?: string;
  delistedReason?: string;
  category?: string;
  provider?: 'ITEM' | 'Individual';
}

interface MCPCardProps {
  mcp: MCPData;
}

const MCPCard: React.FC<MCPCardProps> = ({ mcp }) => {
  const navigate = useNavigate();
  const [showUnpublishModal, setShowUnpublishModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleUnpublish = () => {
    setShowUnpublishModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/mcps/edit/' + mcp.id);
    }, 3000);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/mcps/edit/' + mcp.id);
    }, 3000);
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/mcps/edit/' + mcp.id);
    }, 3000);
  };

  const handleSubmit = () => {
    setShowSubmitModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/mcps/edit/' + mcp.id);
    }, 3000);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/mcps/upload?edit=${mcp.id}`);
  };

  const handleCardClick = () => {
    navigate(`/mcps/edit/${mcp.id}`);
  };

  const handleSubmitClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSubmitModal(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleWithdrawClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowWithdrawModal(true);
  };

  const handleUnpublishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUnpublishModal(true);
  };

  const renderStatusWithTooltip = () => {
    const isRejected = mcp.status === 'Rejected' || mcp.status === 'Auto Rejected';
    const isDelisted = mcp.status === 'Delisted';
    const showTooltipIcon = isRejected || isDelisted;
    const tooltipMessage = isRejected ? mcp.rejectionReason : mcp.delistedReason;
    
    return (
      <div className="relative inline-flex items-center">
        <StatusBadge status={mcp.status} />
        {showTooltipIcon && tooltipMessage && (
          <div 
            className="ml-1 cursor-help"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <AlertCircle className="w-4 h-4 text-amber-500" />
            {showTooltip && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-full mt-1">
                <div className="bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg max-w-xs">
                  {tooltipMessage}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderTypeIndicator = () => {
    if (!mcp.type) return null;

    const typeConfig = {
      build: {
        icon: <Package className="w-4 h-4" />,
        label: 'Build Upload',
        className: 'bg-purple-600/20 text-purple-400 border-purple-600/30'
      },
      store: {
        icon: <Globe className="w-4 h-4" />,
        label: 'Store Link',
        className: 'bg-blue-600/20 text-blue-400 border-blue-600/30'
      }
    };

    const config = typeConfig[mcp.type];

    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${config.className}`}>
        {config.icon}
        {config.label}
      </div>
    );
  };

  const renderProviderIndicator = () => {
    if (!mcp.provider) return null;

    const providerConfig = {
      'ITEM': {
        icon: <Building className="w-4 h-4" />,
        label: 'ITEM',
        className: 'bg-blue-600/20 text-blue-400 border-blue-600/30'
      },
      'Individual': {
        icon: <User className="w-4 h-4" />,
        label: 'Individual',
        className: 'bg-green-600/20 text-green-400 border-green-600/30'
      }
    };

    const config = providerConfig[mcp.provider];

    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${config.className}`}>
        {config.icon}
        {config.label}
      </div>
    );
  };

  const renderCategoryTag = () => {
    if (!mcp.category) return null;

    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium bg-purple-600/20 text-purple-400 border-purple-600/30">
        <Tag className="w-3 h-3" />
        {mcp.category}
      </div>
    );
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

  const renderActions = () => {
    switch (mcp.status) {
      case 'Not Submitted':
        return (
          <div className="flex items-center justify-between w-full">
            <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" onClick={handleEdit} />
            <ActionButton 
              icon={<Send className="w-4 h-4" />} 
              label="Submit" 
              onClick={handleSubmitClick}
            />
            <ActionButton 
              icon={<Trash2 className="w-4 h-4" />} 
              label="Delete" 
              variant="danger" 
              onClick={handleDeleteClick}
            />
          </div>
        );
      case 'Pending':
        return (
          <div className="flex items-center justify-between w-full">
            <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" disabled />
            <ActionButton 
              icon={<XCircle className="w-4 h-4" />} 
              label="Withdraw" 
              variant="warning" 
              onClick={handleWithdrawClick}
            />
            <ActionButton icon={<Trash2 className="w-4 h-4" />} label="Delete" variant="danger" disabled />
          </div>
        );
      case 'Auto Approved':
        return (
          <div className="flex items-center justify-between w-full">
            <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" disabled />
            <ActionButton 
              icon={<XCircle className="w-4 h-4" />} 
              label="Withdraw" 
              variant="warning" 
              onClick={handleWithdrawClick}
            />
            <ActionButton icon={<Trash2 className="w-4 h-4" />} label="Delete" variant="danger" disabled />
          </div>
        );
      case 'Published':
        return (
          <div className="flex items-center justify-between w-full">
            <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" disabled />
            <ActionButton 
              icon={<XCircle className="w-4 h-4" />} 
              label="Unpublish" 
              variant="warning" 
              onClick={handleUnpublishClick}
            />
            <ActionButton icon={<Trash2 className="w-4 h-4" />} label="Delete" variant="danger" disabled />
          </div>
        );
      case 'Auto Rejected':
      case 'Rejected':
        return (
          <div className="flex items-center justify-between w-full">
            <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" onClick={handleEdit} />
            <ActionButton 
              icon={<Send className="w-4 h-4" />} 
              label="Resubmit" 
              onClick={handleSubmitClick}
            />
            <ActionButton 
              icon={<Trash2 className="w-4 h-4" />} 
              label="Delete" 
              variant="danger" 
              onClick={handleDeleteClick}
            />
          </div>
        );
      case 'Delisted':
        return (
          <div className="flex items-center justify-between w-full">
            <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" onClick={handleEdit} />
            <ActionButton 
              icon={<Send className="w-4 h-4" />} 
              label="Resubmit" 
              onClick={handleSubmitClick}
            />
            <ActionButton 
              icon={<Trash2 className="w-4 h-4" />} 
              label="Delete" 
              variant="danger" 
              onClick={handleDeleteClick}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-primary-color rounded-xl overflow-hidden shadow-md border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer">
      <div className="p-6" onClick={handleCardClick}>
        {/* Header Section with Status in Top Right */}
        <div className="relative mb-4">
          {/* Status Badge - Top Right */}
          <div className="absolute top-0 right-0">
            {renderStatusWithTooltip()}
          </div>
          
          <div className="flex items-start space-x-4 flex-1">
            <img 
              src={mcp.image} 
              alt={mcp.name} 
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0 mr-16"
            />
            <div className="flex-1 min-w-0 pr-16">
              <h3 className="text-lg font-semibold text-white mb-2 truncate">{mcp.name}</h3>
              <p className="text-sm text-gray-400 leading-snug mb-3 line-clamp-2">{mcp.description}</p>
              
              {/* Tags Section */}
              <div className="flex flex-wrap gap-2 mb-3">
                {renderCategoryTag()}
                {renderTypeIndicator()}
              </div>
            </div>
          </div>
        </div>

        {/* Date Information - Only Submitted Date */}
        <div className="text-xs text-gray-400 mb-4 space-y-1">
          <div className="flex justify-between">
            <span>Submitted:</span>
            <span className="font-medium">{formatDateTime(mcp.submittedDate)}</span>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          {renderActions()}
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="absolute inset-0 bg-primary-color bg-opacity-95 flex items-center justify-center rounded-xl">
          <div className="text-center">
            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold">Success!</p>
            <p className="text-gray-400 text-sm">Redirecting...</p>
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showUnpublishModal}
        onCancel={() => setShowUnpublishModal(false)}
        onConfirm={handleUnpublish}
        title="Unpublish MCP Server"
        message="Are you sure you want to unpublish this MCP Server? It will no longer be available to users."
        confirmLabel="Unpublish"
        cancelLabel="Cancel"
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete MCP Server"
        message="Are you sure you want to delete this MCP Server? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />

      <ConfirmationModal
        isOpen={showWithdrawModal}
        onCancel={() => setShowWithdrawModal(false)}
        onConfirm={handleWithdraw}
        title="Withdraw MCP Server"
        message="Are you sure you want to withdraw this MCP Server from review?"
        confirmLabel="Withdraw"
        cancelLabel="Cancel"
        variant="warning"
      />

      <ConfirmationModal
        isOpen={showSubmitModal}
        onCancel={() => setShowSubmitModal(false)}
        onConfirm={handleSubmit}
        title="Submit MCP Server"
        message="Are you sure you want to submit this MCP Server for review?"
        confirmLabel="Submit"
        cancelLabel="Cancel"
      />
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  variant?: 'default' | 'danger' | 'warning';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  variant = 'default',
  disabled = false,
  onClick 
}) => {
  const getVariantClasses = () => {
    if (disabled) {
      return 'text-gray-500 cursor-not-allowed';
    }
    
    switch (variant) {
      case 'danger':
        return 'text-red-500 hover:text-red-400';
      case 'warning':
        return 'text-yellow-500 hover:text-yellow-400';
      default:
        return 'text-purple-400 hover:text-purple-400';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 text-sm font-medium transition-colors ${getVariantClasses()}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default MCPCard; 