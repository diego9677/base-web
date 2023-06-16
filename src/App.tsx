import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Campeonatos } from "./pages/campeonatos";
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
          <MainLayout title="Home">
            <Home />
          </MainLayout>
        }
      />
      <Route path="/campeonato"
        element={
          <MainLayout title="Campeonatos">
            <Campeonatos />
          </MainLayout>
        }
      />
      <Route path="/campeonato-form"
        element={
          <MainLayout title="Campeonato">
            <CampeonatoForm />
          </MainLayout>
        }
      />
      <Route path="/cronograma"
        element={
          <MainLayout title="Cronograma de Partidos">
            <Cronograma />
          </MainLayout>
        }
      />
      <Route path="/posiciones"
        element={
          <MainLayout title="Tabla de posiciones">
            <Posiciones />
          </MainLayout>
        }
      />
      <Route path="" element={<Navigate to={"/home"} />} />
    </Routes>
  );
}

export default App;
