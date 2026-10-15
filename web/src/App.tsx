import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Checkout from './pages/Checkout'
import Confirmacion from './pages/Confirmacion'
import Menu from './pages/Menu'

export default function App() {
  return (
    <>
      <Header />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido/:id" element={<Confirmacion />} />
        </Routes>
      </main>
    </>
  )
}
