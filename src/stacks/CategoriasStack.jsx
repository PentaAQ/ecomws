import { useQuery } from "@tanstack/react-query";
import { useCategoriaStore } from "../stores/CategoriaStore";

export const useMostrarCategoriasQuery = () => {
  const { mostrarCategorias } = useCategoriaStore();
  return useQuery({
    queryKey: ["Mostrar Categorias"],
    queryFn: () => mostrarCategorias(),
  });
};
