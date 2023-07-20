import { Link } from "react-router-dom";
import { BiConfused } from "react-icons/bi";

import Button from "../ui/Button";

const Problem = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-evenly items-center">
        <div className="flex items-center mb-4 text-blue-500">
          <span className="text-3xl mr-2">Something went wrong</span>
          <BiConfused size={40} />
        </div>
        <Link tabIndex={-1} to="/">
          <Button variant="outline">Back to home?</Button>
        </Link>
    </div>
  );
};

export default Problem;