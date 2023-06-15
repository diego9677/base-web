import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Campeonato } from "./pages/campeonato";
import { CampeonatoForm } from "./pages/campeonato_form";
import { Cronograma } from "./pages/cronograma";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Posiciones } from "./pages/posiciones";


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/campeonato"
        element={
          <MainLayout>
            <Campeonato />
          </MainLayout>
        }
      />
      <Route path="/campeonato-form"
        element={
          <MainLayout>
            <CampeonatoForm />
          </MainLayout>
        }
      />
      <Route path="/cronograma"
        element={
          <MainLayout>
            <Cronograma />
          </MainLayout>
        }
      />
      <Route path="/posiciones"
        element={
          <MainLayout>
            <Posiciones />
          </MainLayout>
        }
      />
      <Route path="" element={<Navigate to={"/home"} />} />
    </Routes>
  );
}

export default App;
