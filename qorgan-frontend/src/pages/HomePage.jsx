import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Counter from "../components/Counter";

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto py-4 px-6 items-center justify-between min-h-screen bg-white">
      <section className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between py-12 px-6 bg-gray-50">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Мемлекеттік органдарға өтініш беру
          </h1>
          <p className="text-gray-600 mt-3 max-w-lg mx-auto">
            Әкімдіктер, Министрліктер, Комитеттер және басқа мекемелер кезексіз
            және бюрократиялық кедергісіз
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
              Өтініш беру
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300">
              Жауапқа шағымдану
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300">
              Сотқа талап-арыз беру
            </button>
          </div>
        </div>
        <div className="mt-8 sm:mt-0 sm:ml-12">
          <Counter />
        </div>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Танымал өтініштер
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-3">
            <span className="text-blue-600">🚧</span>
            <p className="text-gray-800">Жолдағы шұңқырлар</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-3">
            <span className="text-orange-600">🌐</span>
            <p className="text-gray-800">Интернетке байланысты қиындықтар</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-3">
            <span className="text-purple-600">💳</span>
            <p className="text-gray-800">
              Қаржылық қызметтерді тұтынушылардың құқықтары
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl w-full py-12 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Қалай жұмыс істейді?
        </h2>
        <p className="text-gray-600 mt-3 max-w-lg mx-auto">
          3 қарапайым қадам арқылы интернет алаяқтарын тоқтатыңыз!
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">1. Өтініш қалдыру</h3>
            <p className="text-gray-600 mt-2">
              Алаяқтық туралы бізге хабарлаңыз.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">2. Тексеру</h3>
            <p className="text-gray-600 mt-2">
              Біздің мамандар сіздің ісіңізді қарайды.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">3. Шешім</h3>
            <p className="text-gray-600 mt-2">
              Қажетті шаралар қабылданып, сізге хабар беріледі.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl w-full py-12 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Пайдаланушылар не дейді?
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-8 justify-center">
          <div className="p-6 bg-white shadow-md rounded-lg max-w-md">
            <p className="text-gray-700">
              "Менің ақшамды алаяқ қайтармай қойды, бірақ Qorgan көмегімен 2
              аптада шешілді!"
            </p>
            <p className="text-gray-500 mt-2">– Аружан, Алматы</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg max-w-md">
            <p className="text-gray-700">
              "Бұл платформа менің мәселемді тез және оңай шешуге көмектесті!"
            </p>
            <p className="text-gray-500 mt-2">– Әлихан, Нұр-Сұлтан</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
