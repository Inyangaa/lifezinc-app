import { Heart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface NavigationProps {
  onNavigate: (page: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const { user } = useAuth();

  const handleBeginJourney = () => {
    if (user) {
      onNavigate('journal');
    } else {
      onNavigate('auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-cyan-100/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="font-bold text-2xl tracking-tight bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">LifeZinc</div>
            <div className="text-xs text-gray-500 font-medium">Grow Through What You Go Through</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => onNavigate("home")} className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate("about")} className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors">
            About
          </button>
          <button onClick={() => onNavigate("faq")} className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors">
            FAQ
          </button>
          <button onClick={() => onNavigate("therapist-support")} className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors">
            Find a Therapist
          </button>
          <button onClick={() => onNavigate("contact")} className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors">
            Contact
          </button>
        </nav>

        <button
          onClick={handleBeginJourney}
          className="lz-tap px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <span>Begin Journey</span>
        </button>
      </div>
    </header>
  );
}
