import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useNavigation } from "../hooks/useNavigation";

const ForbiddenPage = () => {
  const {nav} = useNavigation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card title="Access Denied" className="w-full max-w-md text-center">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            403 - Forbidden
          </h2>
          <p className="text-gray-500 mb-6">
            You do not have the necessary permissions to access this page.
          </p>
          <div className="flex flex-col">
          <Button
            variant="link"
            onClick={() => nav.dashboard.go()}
          >
           Go back to Home page
          </Button>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default ForbiddenPage;
