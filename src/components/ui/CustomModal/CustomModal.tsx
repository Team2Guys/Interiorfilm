import React from 'react';

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: any;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) return null; // Don't render the modal if not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
