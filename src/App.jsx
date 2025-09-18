import { BrowserRouter, useLocation } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import AppRoutes from "./routes/AppRoutes"
import { Provider } from "react-redux"
import {store} from "./redux/store"

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <div className="flex flex-col min-h-screen">
      {/* faqat website sahifalarida Header va Footer */}
      {!isAdminRoute && <Header /> }

      <main className="flex-grow">
        <AppRoutes />
      </main>

      {!isAdminRoute && <Footer /> }

    </div>
  )
}
export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  )
}


