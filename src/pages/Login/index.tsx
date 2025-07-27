import { use, useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useSetUser } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../hooks/useNavigation";

const allPermissions = [
  "VIEW_POSTS",
  "VIEW_COMMENTS",
  "EDIT_POST",
  "CREATE_POST",
];

const Login = () => {
  //Hooks
  const setUser = useSetUser();
  const {go,nav} = useNav()

  //States
  const [permissions, setPermissions] = useState<string[]>(['LOGIN']);

  //Handlers
  const togglePermission = (perm: string) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username") as string;

    setUser({
      name: username,
      permissions,
    });
    go(nav.dashboard.go())

  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card title="Login" className="w-full max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="username"
            id="username"
            name="username"
            placeholder="username123.."
            required
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Permissions:
            </label>
            <div className="space-y-2 mt-2">
              {allPermissions.map((perm) => (
                <label key={perm} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={() => togglePermission(perm)}
                  />
                  {perm}
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button>Login</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
