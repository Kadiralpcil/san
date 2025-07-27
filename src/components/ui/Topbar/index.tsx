import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../../store/user';
import routes from '../../../navigation/routes';

const TopBar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {data: user} = useUser()

  const handleLogout = () => {
    queryClient.removeQueries({ queryKey: ['current-user'] });
    navigate('/login');
  };

  const accessibleRoutes = routes.filter(route =>
    !route.permissions || route.permissions.every(p => user?.permissions.includes(p))
  ).filter(route =>
    route.name !== 'login' && route.name !== 'forbidden'
  );

  return (
    <header className="bg-[#1A1A1A] text-white p-4 flex justify-between items-center shadow-md">
      <nav className="flex items-center space-x-4">
        {accessibleRoutes.map(route => (
          !route.path.includes(':') && (
            <Link
              key={route.name}
              to={route.path}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              {route.name.charAt(0).toUpperCase() + route.name.slice(1).replace('-', ' ')}
            </Link>
          )
        ))}
      </nav>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40" // Dummy avatar
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span>Hello, {user?.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;
