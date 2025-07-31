// src/components/DeptHead/DeptHeadNavbar.tsx
import DeptName from "./DeptName";
import RequestLicense from "./RequestLicense";
import ToggleTheme from "./ToggleTheme";

interface Props {
  toggleForm: () => void;
}

const DeptHeadNavbar = ({ toggleForm }: Props) => {
  return (
    <nav className="relative flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-800 shadow">
      <DeptName />
      <div className="flex items-center space-x-4 relative">
        <RequestLicense onClick={toggleForm} />
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default DeptHeadNavbar;
