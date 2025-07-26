// src/components/user/UserWelcome.tsx
const UserWelcome = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        👋 Welcome User
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Be a member of a department to request or use software licenses.
      </p>
    </div>
  );
};

export default UserWelcome;
