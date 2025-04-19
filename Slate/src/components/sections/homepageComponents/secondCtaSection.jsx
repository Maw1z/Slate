import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function secondCtaSection() {
  return (
    <section className="bg-background font-Lex h-[70vh] w-screen py-20">
      <div className="mx-auto my-auto flex h-10/12 w-10/12 flex-col items-center justify-center">
        <div className="mb-5 text-center">
          <h1 className="font-Grotesk mb-4 text-6xl font-bold">
            Now&apos;s the Time to Write Your Story
          </h1>
          <p className="mb-7 text-2xl">
            Every note matters—start where you are.
          </p>
          <Link to="/signup">
            <Button size="xxl" textSize="lg">
              Create Your First Notebook
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default secondCtaSection;
