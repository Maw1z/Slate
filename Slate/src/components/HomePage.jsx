import Header from "./sections/HeaderLoggedOut";
import CtaSection from "./sections/homepageComponents/ctaSection";
import FeaturesSections from "./sections/homepageComponents/featuresSection";
import ShortcutsSection from "./sections/homepageComponents/shortcutsSection";
import SecondCtaSection from "./sections/homepageComponents/secondCtaSection";

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
