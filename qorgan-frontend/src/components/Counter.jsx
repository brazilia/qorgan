import { useEffect, useRef } from "react";
import gsap from "gsap";

const Counter = ({ endValue }) => {
  const countRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      countRef.current,
      { innerText: 0, scale: 1, color: "#3b82f6" },
      {
        innerText: endValue,
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },
        scale: 1.2,
        color: "#1e40af",
        yoyo: true,
        repeat: 1,
      }
    );
  }, [endValue]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="text-4xl font-bold text-gray-900 text-center sm:text-right">
        <span ref={countRef} className="text-blue-600"></span> Қылмыс шешілді
      </div>
    </div>
  );
};

export default Counter;
