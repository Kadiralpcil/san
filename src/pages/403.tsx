import { Link, useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card title="Access Denied" className="w-full max-w-md text-center">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            403 - Forbidden
          </h2>
          <p className="text-gray-700 mb-6">
            You do not have the necessary permissions to access this page.
          </p>
          <div className="flex flex-col">

          <Button
            variant="link"
            onClick={() => navigate(-1)}
            // className="inline-blockpx-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            go back
          </Button>
          <Button
            variant="link"
            onClick={() => navigate(-1)}
          >
           go Home
          </Button>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default ForbiddenPage;
