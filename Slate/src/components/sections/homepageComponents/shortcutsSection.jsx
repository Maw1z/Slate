import shortcutsImage from "../../../assets/shortcutsImage.png";

function shortcutsSection() {
  return (
    <section className="bg-background font-Lex w-screen py-20">
      <div className="mx-auto my-auto flex h-10/12 w-10/12 flex-col items-center justify-center">
        <div className="mb-5 text-center">
          <h1 className="font-Grotesk mb-2 text-5xl font-bold">
            Speed Meets Simplicity
          </h1>
          <p className="text-xl">
            Quick shortcuts, instant search, and no learning curve. <br />
            Get your ideas down faster with a smooth, responsive writing
            experience.
          </p>
        </div>
        <div className="mx-auto flex h-[675px] w-3/4 items-center justify-center">
          <img src={shortcutsImage} className="h-full" />
        </div>
      </div>
    </section>
  );
}

export default shortcutsSection;
