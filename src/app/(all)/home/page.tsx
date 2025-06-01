import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";


const HomePage = () => {
  return (
    <section>
      <Hero/>
      <About/>
      <Pricing/>
      <Contact/>
    </section>
  );
};

export default HomePage;
