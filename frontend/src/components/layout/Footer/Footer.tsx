// src/components/layout/footer/Footer.tsx
import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterLegal from './FooterLegal';
import FooterBottom from './FooterBottom';
import FooterSystem from './FooterSystem';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-10 mx-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <FooterBrand />
        <FooterLinks />
        <FooterLegal />
        <FooterSystem />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
