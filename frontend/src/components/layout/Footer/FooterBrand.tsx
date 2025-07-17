// src/components/layout/footer/FooterBrand.tsx
import logo from '../../../assets/license_logo.png';

const FooterBrand = () => {
  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <div className="flex items-center gap-3">
        <img src={logo} alt="LicenseGuard Logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-gray-900 dark:text-white">LicenseGuard</span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        The enterprise software license management solution for modern organizations.
      </p>
    </div>
  );
};

export default FooterBrand;
