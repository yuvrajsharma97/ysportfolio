import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "../components/Hero";
import TechStrip from "../components/TechStrip";
import ProjectGrid from "../components/ProjectGrid";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import StackedSection from "../components/StackedSection";
import TechStack from "../components/TechStack";

const PortfolioPage = () => {
  return (
    // overflow-x-clip, not -hidden: hidden turns this div into a scroll
    // container, which stops the stacked sections from sticking.
    <div className="min-h-screen overflow-x-clip bg-bg text-text">
      {/* <Navbar /> */}
      <StackedSection layer={1} isFirst>
        <Hero />
        <TechStrip />
      </StackedSection>
      {/* <IntroStatement /> */}
      <StackedSection layer={2}>
        <ProjectGrid />
      </StackedSection>
      {/* <Capabilities /> */}
      <StackedSection layer={3}>
        <TechStack />
      </StackedSection>
      {/* <Testimonials /> */}
      <StackedSection layer={4}>
        <Experience />
      </StackedSection>
      {/* <OpenSource /> */}
      <StackedSection layer={5} isLast>
        <Contact />
        <Footer />
      </StackedSection>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default PortfolioPage;
