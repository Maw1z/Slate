import Header from "./Header";
import CtaSection from "./sections/ctaSection";
import FeaturesSections from "./sections/featuresSection";
import ShortcutsSection from "./sections/shortcutsSection";
import SecondCtaSection from "./sections/secondCtaSection";

function HomePage() {
  return (
    <>
      <Header />
      <CtaSection />
      <FeaturesSections />
      <ShortcutsSection />
      <SecondCtaSection />
    </>
  );
}

export default HomePage;
