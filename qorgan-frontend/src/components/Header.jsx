import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <nav className="flex justify-between items-center px-6">
        <h1 className="text-lg font-bold">Qorgan</h1>
        <div className="space-x-4">
          <Link to="/">Home Page</Link>
          <Link to="/report">Report Fraud</Link>
          <Link to="/cases">Track Case</Link>
          <Link to="/admin">Admin Login</Link>
          <Link to="/auth">Аккаунт</Link>
          <Link to="/report">Статистика</Link>
          <Link to="/about">Біз туралы</Link>
          <Link to="/contact">Байланыс</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
