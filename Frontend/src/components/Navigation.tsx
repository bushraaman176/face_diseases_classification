import { useState, useEffect } from 'react';
import { Menu, X, Home, BookOpen, Mail, LogOut, User, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CartModal } from './CartModal';

interface UserData {
  id: string;
  email: string;
  name: string;
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Skin Guide', href: '/guide', icon: BookOpen },
    { label: 'Skincare Tips', href: '/tips', icon: Sparkles },
  ];

  return (
    <>
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm border-b border-border">
      {/* Background - using design system colors */}
      <div className="absolute inset-0 bg-background -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-soft">
              <span className="text-primary-foreground font-bold text-lg">✨</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">
                DermAI
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Skincare Advisor
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 relative"
                >
                  <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="font-medium text-sm">{item.label}</span>
                  {/* Subtle underline animation */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Open shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
              </button>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </div>
              )}
            </div>

            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white shadow-soft hover:shadow-medium transition-all duration-200 rounded-full px-6 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-medium transition-all duration-200 rounded-full px-6"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                );
              })}
              <div className="px-3 py-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 text-sm mb-2 px-3 py-2">
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                    </div>
                    <Button
                      onClick={handleLogout}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-medium transition-all duration-200 rounded-full px-6 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft rounded-full"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </nav>
    <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
