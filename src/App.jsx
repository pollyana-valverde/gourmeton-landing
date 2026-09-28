import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Apresentacao from './components/Apresentacao'
import Funcionalidades from './components/Funcionalidades'
import Cardapio from './components/Cardapio'
import Depoimentos from './components/Depoimentos'
import Contato from './components/Contato'
import Footer from './components/Footer'

// Componente raiz: apenas organiza a ordem das seções da landing page
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Apresentacao />
        <Funcionalidades />
        <Cardapio />
        <Depoimentos />
        <Contato />
      </main>
      <Footer />
    </>
  )
}

export default App
