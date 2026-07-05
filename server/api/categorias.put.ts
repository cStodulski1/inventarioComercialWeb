import { FetchError } from "ofetch";
import type { ApiResponse } from "~~/shared/types/api-response";
import type { Categoria } from "~~/shared/types/categorias/categoria";
import { _createAndUpdateCategoriaSchema, type CreateUpdateCategoriaRequest } from "~~/shared/types/categorias/create-update-categoria-request";

export default defineEventHandler<EventHandlerRequest>(async (event) => {
	const config = useRuntimeConfig();

	try {
		const body = await readBody<CreateUpdateCategoriaRequest>(event);
		const result = _createAndUpdateCategoriaSchema.safeParse(body);
		if (!result.success) {
			throw createError({
				statusCode: 400,
				statusText: "Bad Request",
				data: result.error.message,
			});
		}

		const id = result.data.id;
		const url = `${config.public.apiBaseUrl}/api/categorias/${id}`;

		const response = await $fetch<ApiResponse<Categoria>>(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				nome: result.data.nome,
				descricao: result.data.descricao,
			},
		});

		return response;
	}
	catch (error: unknown) {
		if (error instanceof FetchError) {
			console.log(error);
			throw createError({
				statusCode: error.status || 500,
				statusText: error.data.message,
				data: error.data,
			});
		}

		throw createError({
			statusCode: 500,
			statusMessage: "Erro desconhecido",
		});
	}
});
