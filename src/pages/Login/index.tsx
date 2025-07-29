import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useSetUser } from "../../store/user";
import { useNav } from "../../hooks/useNavigation";
import PermissionChip from "../../components/ui/PermissionChip";

// Constants
const ALL_PERMISSIONS = [
  "VIEW_POSTS",
  "VIEW_COMMENTS",
  "EDIT_POST",
  "CREATE_POST",
] as const;

const DEFAULT_PERMISSIONS = ["LOGIN"] as const;

interface PermissionSelectorProps {
  selectedPermissions: string[];
  onPermissionToggle: (permission: string) => void;
}

const Login = () => {
  // Hooks
  const setUser = useSetUser();
  const { go, nav } = useNav();

  // State
  const [permissions, setPermissions] = useState<string[]>([
    ...DEFAULT_PERMISSIONS,
  ]);

  // Handlers
  const handlePermissionToggle = (permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (!name.trim()) return;

    setUser({ name: name.trim(), permissions });
    go(nav.dashboard.go());
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card title="Login" className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Username"
            id="name"
            name="name"
            placeholder="Enter your username..."
            required
            autoComplete="username"
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password..."
            required
            autoComplete="current-password"
          />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Select Permissions
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_PERMISSIONS.map((permission) => (
                <PermissionChip
                  key={permission}
                  permission={permission}
                  isSelected={permissions.includes(permission)}
                  onToggle={handlePermissionToggle}
                />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
