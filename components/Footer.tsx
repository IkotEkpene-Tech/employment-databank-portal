export const Footer = () => {
  return (
    <footer className="bg-[#00572f] text-[#a2bcac] py-6 mt-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Ikot Ekpene Local Government Area
          </p>
          <p className="text-xs opacity-60 mt-1">
            Official Job & Support Registration Portal • Chairmanship of Hon. Elder Aniefiok Nkom
          </p>
        </div>
      </div>
    </footer>
  );
};
