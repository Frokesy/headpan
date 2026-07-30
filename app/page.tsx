import Hero from "./components/defaults/Hero"
import TopNav from "./components/defaults/TopNav"
import FeaturedArtisans from "./components/home/FeaturedArtisans"
import PopularServices from "./components/home/PopularServices"

const Home = () => {
  return (
    <div>
      <TopNav />
      <Hero />
      <PopularServices />
      <FeaturedArtisans />
    </div>
  )
}

export default Home