import { Link } from "react-router-dom";
import logo from "../images/logo.png"; 

const Header = () => {
  return (
    <header className="max-w-4xl mx-auto bg-white py-4 px-6 flex justify-between items-center">
      <div>
        <img src={logo} alt="Qorgan Logo" className="h-20 w-auto object-contain" />
      </div>
      <nav className="flex justify-between items-center px-6">
        <div className="space-x-4">
          <Link to="/">Басты бет</Link>
          <Link to="/report">Өтініш қалдыру</Link>
          <Link to="/auth">Кіру</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
