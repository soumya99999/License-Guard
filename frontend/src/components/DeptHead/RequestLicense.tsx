// src/components/DeptHead/Navbar/RequestLicense.tsx
import { FiSend } from 'react-icons/fi';

interface Props {
  onClick: () => void;
}

const RequestLicense = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
    >
      <FiSend className="mr-2" />
      Request License
    </button>
  );
};

export default RequestLicense;
