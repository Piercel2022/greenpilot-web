import HomeNavbar from "../components/home/HomeNavbar";
import HeroSection from "../components/home/Hero";
import ProblemSection from "../components/home/ProblemSection";
import ModulesSection from "../components/home/ModulesSection";
import ResultSection from "../components/home/ResultSection";
import BenefitsSection from "../components/home/BenefitsSection";
import CTASection from "../components/home/CTASection";
import Footer from "../components/home/Footer";

export default function HomePage() {
return ( 

<div className="min-h-screen bg-white text-slate-950"> 

 <main> 
    <HomeNavbar /> 
    <HeroSection /> 
    <ProblemSection />
    <ModulesSection />
    <BenefitsSection />
    <ResultSection />
    <CTASection />
    <Footer />
 </main> 
</div>
);
}
