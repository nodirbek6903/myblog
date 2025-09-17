import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import AppRoutes from "./routes/AppRoutes"
function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* asosiy sahifalar */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

        {/* footer */}
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
