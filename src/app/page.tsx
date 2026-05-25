import Nav from "@/components/Nav";
import About from "@/components/About";
import ForWho from "@/components/ForWho";
import PainSection from "@/components/PainSection";
import Packages from "@/components/Packages";
import Commitment from "@/components/Commitment";
import StatsStrip from "@/components/StatsStrip";
import DemoSection from "@/components/DemoSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LightTrail from "@/components/decorative/LightTrail";

export default function Home() {
  return (
    <main>
      <Nav />
      <About />
      {/* dark → light transition */}
      <LightTrail fromColor="#F2A541" toColor="#2FB7A4" />
      <ForWho />
      <Packages />
      <Commitment />
      <StatsStrip />
      {/* dark → light transition */}
      <LightTrail fromColor="#2FB7A4" toColor="#6091B0" />
      <DemoSection />
      <PainSection />
      <FAQ />
      {/* light → dark transition */}
      <LightTrail fromColor="#6091B0" toColor="#F2A541" />
      <FinalCTA />
      <Footer />
    </main>
  );
}
