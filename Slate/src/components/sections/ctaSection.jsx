import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ctaSection() {
  return (
    <section className="bg-background font-Lex flex h-[70vh] w-screen overflow-y-hidden">
      <div className="mx-auto my-auto flex h-10/12 w-10/12 items-center justify-center p-4">
        {/* Text div */}
        <div className="h-full w-1/2 translate-y-20 flex-col px-4">
          <h1 className="font-Grotesk mb-4 text-6xl font-bold">
            Clean & Minimalist <br /> Note-Taking.
          </h1>
          <h4 className="mb-3 text-2xl font-medium">
            Ditch the distractions - our app offers a clean, <br /> streamlined
            space for pure note-taking.
          </h4>
          <Link to="/signup">
            <Button size="xxl" textSize="lg">
              Get Started
            </Button>
          </Link>
        </div>
        {/* Image div */}
        <div className="h-full w-1/2 border"></div>
      </div>
    </section>
  );
}

export default ctaSection;
