const Footer = () => {
    return (
      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-white">
          <p>&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;