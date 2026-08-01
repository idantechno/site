import Nav from "@/components/Nav";
import About from "@/components/About";
import ForWho from "@/components/ForWho";
import PainSection from "@/components/PainSection";
import WhatsAppAgent from "@/components/WhatsAppAgent";
import Packages from "@/components/Packages";
import Commitment from "@/components/Commitment";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LightTrail from "@/components/decorative/LightTrail";
import GalleryShowcase from "@/components/gallery/GalleryShowcase";

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
      {/* subtle brand divider */}
      <LightTrail fromColor="#DC5D46" toColor="#6091B0" />
      <PainSection />
      {/* הדמו של סוכן הוואטסאפ — מיד אחרי ה"למה" (ההוכחה ל"ענה לפניכם") */}
      <WhatsAppAgent />
      {/* הוכחת יכולת מדיה — תמונות וסרטונים שנוצרו ב-AI */}
      <section className="px-6 py-16" style={{ backgroundColor: "#F0E1D5" }}>
        <div className="max-w-6xl mx-auto">
          <GalleryShowcase compact />
        </div>
      </section>
      <FAQ />
      {/* subtle brand divider */}
      <LightTrail fromColor="#6091B0" toColor="#DC5D46" />
      <FinalCTA />
      <Footer />
    </main>
  );
}
