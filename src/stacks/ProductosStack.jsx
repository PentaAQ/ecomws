import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useProductosStore } from "../stores/ProductosStore";
import { toast } from "sonner";

export const useMostrarProductosQuery = () => {
  const { mostrarProductos } = useProductosStore();
  return useQuery({
    queryKey: ["Mostrar Productos"],
    queryFn: () => mostrarProductos(),
  });
};

export const useInsertarProductoMutation = () => {
  const { insertarProducto } = useProductosStore();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["Insertar Producto"],
    mutationFn: (nuevoProducto) => insertarProducto(nuevoProducto),
    onError: () => {
      toast.error("Error al insertar el producto");
    },
    onSuccess: () => {
      toast.success("Registro añadido correctamente");
      queryClient.invalidateQueries(["Mostrar Productos"]);
      queryClient.invalidateQueries(["Buscar Producto"]);
    },
  });
};

export const useEliminarProdutoMutation = () => {
  const queryClient = useQueryClient();
  const { eliminarProducto, itemSelect } = useProductosStore();

  return useMutation({
    mutationKey: ["Eliminar Producto"],
    mutationFn: () => eliminarProducto(itemSelect),
    onError: () => {
      toast.error("Error al eliminar el producto");
    },
    onSuccess: () => {
      toast.success("Producto eliminado correctamente");
      queryClient.invalidateQueries(["Mostrar Productos"]);
      queryClient.invalidateQueries(["Buscar Producto"]);
    },
  });
};

export const useEditarProductoMutation = () => {
  const { editarProducto, itemSelect } = useProductosStore();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["Editar Producto"],
    mutationFn: (productoEditado) =>
      editarProducto({ ...productoEditado, id: itemSelect.id }),
    onError: () => {
      toast.error("Error al editar el producto");
    },
    onSuccess: () => {
      toast.success("Producto editado correctamente");
      queryClient.invalidateQueries(["Mostrar Productos"]);
      queryClient.invalidateQueries(["Buscar Producto"]);
    },
  });
};

export const useBuscarProductoQQuery = () => {
  const { buscarProducto, buscador } = useProductosStore();
  
  return useQuery({
    queryKey: ["Buscar Producto", buscador],
    queryFn: () => buscarProducto({ nombre: buscador }),
    enabled: buscador.trim().length > 0, // Solo ejecutar si hay texto
  });
};