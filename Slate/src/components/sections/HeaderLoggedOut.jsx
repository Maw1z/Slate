import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function HeaderLoggedOut() {
  return (
    <header className="sticky top-0 z-10 flex h-[70px] w-screen items-center justify-between border-b-4 bg-white p-10 px-14">
      <div className="flex items-center justify-between gap-2">
        <img src={logo} alt="Slate logo" className="h-7" />
        <h4 className="font-Grotesk text-2xl font-bold">Slate</h4>
      </div>
      <div className="flex gap-2">
        <Link to="/login">
          <Button
            variant="reverse"
            size="lg"
            textSize="md"
            className="font-bold hover:cursor-pointer"
          >
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default HeaderLoggedOut;
