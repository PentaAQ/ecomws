import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "../supabase/supabase.config";
import {
  useEditarProductoMutation,
  useInsertarProductoMutation,
} from "../stacks/ProductosStack";
import { useProductosStore } from "../stores/ProductosStore";
import { useModalStore } from "../stores/ModalStore";

const INITIAL_FORM_STATE = {
  name: "",
  precio: "",
  descripcion: "",
  categoria: "",
};

export const useFormProducts = () => {
  const { accion, itemSelect } = useProductosStore();
  const { setActiveModalForm } = useModalStore();
  const { mutate: editarProducto, isPending: isEditando } =
    useEditarProductoMutation();
  const { mutate: insertarProducto, isPending: isInsertando } =
    useInsertarProductoMutation();

  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);

  const isEditMode = accion === "Editar";
  const isLoading = isEditando || isInsertando;

  // Cargar datos en modo edición
  useEffect(() => {
    if (isEditMode && itemSelect) {
      setFormValues({
        name: itemSelect.nombre || "",
        precio: itemSelect.precio_unidad || "",
        descripcion: itemSelect.descripcion || "",
        categoria: itemSelect.id_categoria || "",
      });
      setImagenPreview(itemSelect.imagen || null);
      setImagenFile(null);
    } else {
      setFormValues(INITIAL_FORM_STATE);
      setImagenPreview(null);
      setImagenFile(null);
    }
  }, [isEditMode, itemSelect]);

  // Handlers
  const handleImagenChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona una imagen válida");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 5MB");
      return;
    }

    setImagenFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagenPreview(reader.result);
    reader.onerror = () => toast.error("Error al leer la imagen");
    reader.readAsDataURL(file);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const { error } = await supabase.storage
      .from("imagenes")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) throw new Error(error.message);

    const { data: urlData } = supabase.storage
      .from("imagenes")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const validateForm = (data) => {
    if (!data.nombre?.trim()) {
      toast.error("El nombre es requerido");
      return false;
    }
    if (!data.precio_unidad || data.precio_unidad <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return false;
    }
    if (!data.descripcion?.trim()) {
      toast.error("La descripción es requerida");
      return false;
    }
    if (!data.id_categoria) {
      toast.error("Debes seleccionar una categoría");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const productoData = {
        nombre: formData.get("name")?.trim(),
        precio_unidad: parseFloat(formData.get("precio")),
        descripcion: formData.get("descripcion")?.trim(),
        id_categoria: formData.get("categoria"),
      };

      if (!validateForm(productoData)) return;

      let imagen = itemSelect?.imagen;
      if (imagenFile) {
        imagen = await uploadImage(imagenFile);
      } else if (!isEditMode) {
        toast.error("Debes seleccionar una imagen");
        return;
      }

      productoData.imagen = imagen;

      if (isEditMode) {
        editarProducto(productoData);
      } else {
        insertarProducto(productoData);
      }

      setActiveModalForm();
    } catch (error) {
      toast.error(error.message || "Error al procesar el formulario");
    }
  };

  const handleCloseModal = useCallback(() => {
    const hasChanges =
      formValues.name !== (itemSelect?.nombre || "") ||
      formValues.precio !== (itemSelect?.precio_unidad || "") ||
      formValues.descripcion !== (itemSelect?.descripcion || "") ||
      formValues.categoria !== (itemSelect?.id_categoria || "") ||
      imagenFile !== null;

    if (hasChanges && !isEditMode) {
      const confirmar = window.confirm(
        "¿Deseas salir sin guardar los cambios?"
      );
      if (!confirmar) return;
    }

    setActiveModalForm();
  }, [formValues, itemSelect, imagenFile, isEditMode, setActiveModalForm]);

  return {
    formValues,
    imagenPreview,
    imagenFile,
    isEditMode,
    isLoading,
    accion,
    handleImagenChange,
    handleInputChange,
    handleSubmit,
    handleCloseModal,
  };
};
