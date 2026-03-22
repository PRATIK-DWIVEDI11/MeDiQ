import Header from '../components/common/Header'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import LoginPortals from '../components/landing/LoginPortals'
import Footer from '../components/common/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <Hero />
      <LoginPortals />
      <Features />
      <Footer />
    </main>
  )
}

