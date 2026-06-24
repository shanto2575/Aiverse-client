import Banner from "@/components/Banner";
import FeaturedSection from "@/components/FeaturedSection";
import PromptEngineeringSection from "@/components/PromptEngineeringSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TopPromptCreators from "@/components/TopPromptCreators";
import WhyChooseAiverse from "@/components/WhyChooseAiverse";

export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedSection/>
      <WhyChooseAiverse/>
      <PromptEngineeringSection/>
      <TopPromptCreators/>
      <TestimonialsSection/>
    </div>
  );
}
