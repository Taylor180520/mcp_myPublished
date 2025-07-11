import React from 'react';

type StatusType = 
  | 'Not Submitted' 
  | 'Pending' 
  | 'Auto Approved'
  | 'Published'
  | 'Auto Rejected' 
  | 'Rejected'
  | 'Delisted';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = '';
  let textColor = 'text-white';
  
  switch (status) {
    case 'Not Submitted':
      bgColor = 'bg-gray-600';
      break;
    case 'Pending':
      bgColor = 'bg-amber-600';
      break;
    case 'Auto Approved':
      bgColor = 'bg-green-600';
      break;
    case 'Published':
      bgColor = 'bg-green-600';
      break;
    case 'Auto Rejected':
    case 'Rejected':
      bgColor = 'bg-red-600';
      break;
    case 'Delisted':
      bgColor = 'bg-purple-600';
      break;
    default:
      bgColor = 'bg-gray-600';
  }

  return (
    <span className={`${bgColor} ${textColor} text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap`}>
      {status}
    </span>
  );
};

export default StatusBadge;