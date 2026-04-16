import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Pricing } from "@/components/marketing/Pricing";
import { Features } from "@/components/marketing/Features";
import { Portfolio } from "@/components/marketing/Portfolio";
import { FAQ } from "@/components/marketing/FAQ";
import { Footer } from "@/components/marketing/Footer";

export default function LandingPage() {
  const whatsappNumber = process.env.ADMIN_WHATSAPP ?? "6281234567890";

  return (
    <main className="marketing-bg">
      <Navbar />
      <Hero />
      <Pricing whatsappNumber={whatsappNumber} />
      <Features />
      <Portfolio />
      <FAQ />
      <Footer />
    </main>
  );
}
