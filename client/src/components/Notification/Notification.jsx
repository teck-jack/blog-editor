import { useEffect } from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100'
  };

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  };

  const icon = {
    success: <FiCheck className="text-green-500" />,
    error: <FiAlertCircle className="text-red-500" />,
    warning: <FiAlertCircle className="text-yellow-500" />,
    info: <FiAlertCircle className="text-blue-500" />
  };

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${bgColor[type]} ${textColor[type]} flex items-center`}>
      <div className="mr-2">
        {icon[type]}
      </div>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <FiX />
      </button>
    </div>
  );
};

export default Notification;