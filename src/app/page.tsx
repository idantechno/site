import Nav from "@/components/Nav";
import About from "@/components/About";
import ForWho from "@/components/ForWho";
import PainSection from "@/components/PainSection";
import Packages from "@/components/Packages";
import Commitment from "@/components/Commitment";
import StatsStrip from "@/components/StatsStrip";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LightTrail from "@/components/decorative/LightTrail";

export default function Home() {
  return (
    <main id="main">
      <Nav />
      <About />
      {/* subtle brand divider */}
      <LightTrail fromColor="#6091B0" toColor="#DC5D46" />
      <ForWho />
      <Packages />
      <Commitment />
      <StatsStrip />
      {/* subtle brand divider */}
      <LightTrail fromColor="#DC5D46" toColor="#6091B0" />
      <PainSection />
      <FAQ />
      {/* subtle brand divider */}
      <LightTrail fromColor="#6091B0" toColor="#DC5D46" />
      <FinalCTA />
      <Footer />
    </main>
  );
}
