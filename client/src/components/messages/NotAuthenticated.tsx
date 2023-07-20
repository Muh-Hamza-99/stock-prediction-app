import { Link } from "react-router-dom";

import Button from "../ui/Button";

const NotAuthenticated = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-evenly items-center">
        <span className="text-3xl mr-2 text-blue-500">You are not logged in!</span>
        <Link tabIndex={-1} to="/">
          <Button variant="outline">Back to home?</Button>
        </Link>
    </div>
  );
};

export default NotAuthenticated;