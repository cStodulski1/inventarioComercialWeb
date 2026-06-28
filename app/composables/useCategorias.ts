import type { Categoria } from "~~/shared/types/categorias/categoria";
import type { CreateCategoriaRequest } from "~~/shared/types/categorias/create-categoria-request";

export const useCategorias = () => {
	const create = async (categoriaData: CreateCategoriaRequest) => {
		return await $fetch<ApiResponse<Categoria>>("/api/categorias", {
			method: "POST",
			body: categoriaData,
		});
	};

	return { create };
};
