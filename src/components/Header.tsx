import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-sm font-bold text-white shadow-md">
              LZ
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              LifeZinc
            </span>
          </button>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => handleNavClick("home")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick("for-teens")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            For Teens
          </button>
          <button
            onClick={() => handleNavClick("caregiver")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            For Parents & Caregivers
          </button>
          <button
            onClick={() => handleNavClick("faq")}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            FAQ
          </button>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => handleNavClick("auth")}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={() => handleNavClick("auth")}
            className="rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-1.5 text-sm font-medium text-white hover:from-teal-700 hover:to-cyan-700 transition-all shadow-md"
          >
            Get started
          </button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 md:hidden transition-colors"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            <button
              onClick={() => handleNavClick("home")}
              className="py-2 text-left text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => handleNavClick("for-teens")}
              className="py-2 text-left text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              For Teens
            </button>
            <button
              onClick={() => handleNavClick("caregiver")}
              className="py-2 text-left text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              For Parents & Caregivers
            </button>
            <button
              onClick={() => handleNavClick("faq")}
              className="py-2 text-left text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              FAQ
            </button>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleNavClick("auth")}
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => handleNavClick("auth")}
                className="flex-1 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-2 text-center text-sm font-medium text-white hover:from-teal-700 hover:to-cyan-700 transition-all shadow-md"
              >
                Get started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
