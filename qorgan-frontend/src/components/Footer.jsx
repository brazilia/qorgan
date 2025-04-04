import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="bg-gray-100 py-8 mt-12">
  <div className="max-w-5xl mx-auto px-6">
    <div className="flex flex-wrap justify-between gap-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Qorgan</h3>
        <p className="text-gray-600 mt-2 text-sm">
          Қазақстандағы интернет алаяқтықпен күресу платформасы.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Сілтемелер</h3>
        <ul className="text-gray-600 text-sm mt-2 space-y-1">
          <li><a href="/" className="hover:text-blue-600">Басты бет</a></li>
          <li><a href="/about" className="hover:text-blue-600">Жоба туралы</a></li>
          <li><a href="/contact" className="hover:text-blue-600">Байланыс</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Байланыс</h3>
        <p className="text-gray-600 mt-2 text-sm">Email: support@qorgan.kz</p>
        <p className="text-gray-600 text-sm">Телефон: +7 777 777 7777</p>
      </div>
    </div>
    <Link to="/admin">Admin Login</Link>
    <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-500 text-sm">
      &copy; 2025 Qorgan. Барлық құқықтар қорғалған.
    </div>
  </div>
</footer>

    );
};

export default Footer;
