import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-4xl font-bold">LOGO</h1>
            <nav className="flex space-x-6 mt-4 text-lg">
                <a href="/auth">Аккаунт</a>
                <a href="/about">Біз туралы</a>
                <a href="#">Статистика</a>
                <a href="/contact">Байланыс</a>
            </nav>
            <div className="mt-10 text-5xl font-bold">
                <span className="text-gray-700">10,936</span> Қылмыс шешілді
            </div>
            <button className="mt-6 px-6 py-2 border-2 border-black text-black text-lg rounded">
              <Link to="/report">Өтініш қалдыру</Link>
            </button>
        </div>
    );
};

export default HomePage;
