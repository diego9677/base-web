import { Button } from "../components/common/button";
import { Input } from "../components/common/input";

export const Login = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <section className="border w-1/3 p-10 rounded-md flex flex-col gap-6 shadow-md">
        <h5 className="text-2xl font-bold text-center text-gray-700">Iniciar Sesión</h5>

        <Input id="id_username" label="Usuario" type="text" onChange={() => { }} />
        <Input id="id_username" label="Contraseña" type="password" onChange={() => { }} />

        <Button type="submit" onClick={() => { }}>Ingresar</Button>
      </section>
    </main>
  );
};
