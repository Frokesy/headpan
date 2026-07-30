import Hero from "./components/defaults/Hero"
import TopNav from "./components/defaults/TopNav"
import FeaturedArtisans from "./components/home/FeaturedArtisans"
import HowItWorks from "./components/home/HowItWorks"
import PopularServices from "./components/home/PopularServices"
import Credibility from "./components/home/Credibility"


const Home = () => {
  return (
    <div>
      <TopNav />
      <Hero />
      <PopularServices />
      <FeaturedArtisans />
      <HowItWorks />
      <Credibility />
    </div>
  )
}

export default Home