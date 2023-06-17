import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Campeonatos } from "./pages/campeonatos";
import { CampeonatoForm } from "./pages/campeonato_form";
import { Cronogramas } from "./pages/cronograma";
import { CronogramaForm } from "./pages/cronograma_form";
import { Login } from "./pages/login";
import { Posiciones } from "./pages/posiciones";
import { ResultadoForm } from "./pages/resultado_form";


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/home"
        element={
          <MainLayout title="Home">
            <Home />
          </MainLayout>
        }
      /> */}
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
            <Cronogramas />
          </MainLayout>
        }
      />
      <Route path="/cronograma-form"
        element={
          <MainLayout title="Editar Cronograma">
            <CronogramaForm />
          </MainLayout>
        }
      />
      <Route path="/resultado-form"
        element={
          <MainLayout title="Editar Cronograma">
            <ResultadoForm />
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
      <Route path="" element={<Navigate to={"/campeonato"} />} />
    </Routes>
  );
}

export default App;
