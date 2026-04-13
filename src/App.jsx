import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero'; 
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';


const App = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar />

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;