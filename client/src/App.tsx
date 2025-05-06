import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';


function App() {

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100">
      <Navbar />
      <main>
        <Hero />   
        <Features />        
        <HowItWorks />
      </main>
      <Footer />
    </div>
    </div>
  )
}

export default App
