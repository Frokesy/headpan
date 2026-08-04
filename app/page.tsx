import Hero from "./components/defaults/Hero"
import TopNav from "./components/defaults/TopNav"
import FeaturedArtisans from "./components/home/FeaturedArtisans"
import HowItWorks from "./components/home/HowItWorks"
import PopularServices from "./components/home/PopularServices"
import Credibility from "./components/home/Credibility"
import Testimonial from "./components/home/Testimonial"
import FAQs from "./components/home/FAQs"
import PreFooter from "./components/home/PreFooter"
import Footer from "./components/defaults/Footer"


const Home = () => {
  return (
    <div>
      <TopNav />
      <Hero />
      <PopularServices />
      <FeaturedArtisans />
      <HowItWorks />
      <Credibility />
      <Testimonial />
      <FAQs />
      <PreFooter />
      <Footer />
    </div>
  )
}

export default Home