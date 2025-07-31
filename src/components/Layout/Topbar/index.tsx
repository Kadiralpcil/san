import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import routes from "../../../navigation/routes";
// import { useNav } from '../../../hooks/useNavigation';
import Button from "../../ui/Button";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useNavigation } from "../../../hooks/useNavigation";
import nav from "../../../navigation/nav";

const TopBar = () => {
  const queryClient = useQueryClient();
  // const { go, nav } = useNav();

  const user = useCurrentUser();

  const handleLogout = () => {
    queryClient.setQueryData(["currentUser"], null);
    nav.login.go();
  };

  const accessibleRoutes = routes
    .filter(
      (route) =>
        !route.permissions ||
        route.permissions.every((p) => user?.permissions.includes(p))
    )
    .filter((route) => route.name !== "login" && route.name !== "forbidden");

  return (
    <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 text-white">
      <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <nav className="flex items-center space-x-1">
              {accessibleRoutes.map(
                (route) =>
                  !route.path.includes(":") && (
                    <Link
                      key={route.name}
                      to={route.path}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all duration-200 ease-out"
                    >
                      {route.name.charAt(0).toUpperCase() +
                        route.name.slice(1).replace("-", " ")}
                    </Link>
                  )
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full ring-2 ring-zinc-700/50 object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-sm text-zinc-400">Hello</span>
                  <p className="text-sm font-medium text-white">
                    {user?.name || "Kullanıcı"}
                  </p>
                </div>
              </div>

              <div className="h-6 w-px bg-zinc-700/50"></div>

              <Button
                variant="secondary"
                onClick={handleLogout}
                className="text-sm font-medium"
              >
                Log out
              </Button>
            </div>
          </div>
      </div>
    </header>
  );
};

export default TopBar;
