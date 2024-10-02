import Feature from "../components/Feature";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black backdrop-blur-md overflow-hidden">
      <Hero />
      <Feature />
      <Footer />
    </div>
  );
};

export default HomePage;
