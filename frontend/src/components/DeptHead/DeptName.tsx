// src/components/DeptHead/Navbar/DeptName.tsx
import {useUserStore} from "../../store/userStore";

const DeptName = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);

  if (!user || user.role !== 'DEPT_HEAD' || !user.departmentName) return null;

  return (
    <div className="flex items-center space-x-3">
      <div
        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg cursor-pointer"
        title={user.departmentName}
      >
        {user.departmentName.charAt(0).toUpperCase()}
      </div>
      <span className="text-xl font-semibold text-gray-800 dark:text-white">
        {user.departmentName}
      </span>
    </div>
  );
};

export default DeptName;
