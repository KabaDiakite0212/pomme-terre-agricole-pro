import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Database,
  Users,
  Folder,
  Calendar,
  X,
  BarChart3,
  Package,
  User,
  Wrench,
  Calculator,
  Settings,
  Refrigerator,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Tableau de bord', href: '/', icon: BarChart3 },
  { name: 'Surfaces agricoles', href: '/surfaces', icon: Folder },
  { name: 'Champs', href: '/fields', icon: Calendar },
  { name: 'Récoltes & Stock', href: '/harvests', icon: Package },
  { name: 'Intrants & Stocks', href: '/inputs', icon: Database },
  { name: 'Équipements & Matériels', href: '/equipment', icon: Wrench },
  { name: 'Conservation Chambre Froide', href: '/conservation', icon: Refrigerator },
  { name: 'Conseils Agronomiques', href: '/conseils', icon: BookOpen },
  { name: 'Prévisions & Investissements', href: '/investments', icon: Calculator },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Ventes', href: '/sales', icon: Calendar },
  { name: 'Paramètres', href: '/settings', icon: Settings },
  { name: 'Profil', href: '/profile', icon: User },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        </div>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🥔</span>
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-900">Demal</span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 mt-6 px-6 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-green-100 text-green-800 border-l-4 border-green-600 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                    onClick={() => onClose()}
                  >
                    <item.icon className={cn(
                      "mr-4 h-5 w-5 flex-shrink-0",
                      isActive ? "text-green-600" : "text-gray-400"
                    )} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Version 1.0.0
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
