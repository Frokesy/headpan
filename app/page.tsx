import Hero from "./components/defaults/Hero"
import TopNav from "./components/defaults/TopNav"
import PopularServices from "./components/home/PopularServices"

const Home = () => {
  return (
    <div>
      <TopNav />
      <Hero />
      <PopularServices />
    </div>
  )
}

export default Home