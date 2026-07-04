import type { Categoria } from "~~/shared/types/categorias/categoria";
import type { CreateUpdateCategoriaRequest } from "~~/shared/types/categorias/create-update-categoria-request";

export const useCategorias = () => {
	const create = async (categoriaData: CreateUpdateCategoriaRequest) => {
		return await $fetch<ApiResponse<Categoria>>("/api/categorias", {
			method: "POST",
			body: categoriaData,
		});
	};

	const update = async (categoriaData: CreateUpdateCategoriaRequest) => {
		return await $fetch<ApiResponse<Categoria>>("/api/categorias", {
			method: "PUT",
			body: categoriaData,
		});
	};

	const remove = async (id: string | undefined) => {
		return await $fetch(`/api/categorias/${id}`, {
			method: "DELETE",
		});
	};

	return { create, update, remove };
};
