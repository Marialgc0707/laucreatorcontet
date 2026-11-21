import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [service, setService] = useState(); // servicio preseleccionado en el formulario

  // Preselecciona el servicio y baja al formulario
  const pick = name => { setService(name); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio onHire={setService} />
        <Services onSelect={pick} />
        <Contact preselected={service} />
      </main>
      <Footer />
    </>
  );
}
