import { FetchError } from "ofetch";
import { _createAndUpdateCategoriaSchema, type CreateUpdateCategoriaRequest } from "~~/shared/types/categorias/create-update-categoria-request";
import type { ApiResponse } from "#shared/types/api-response";
import type { Categoria } from "~~/shared/types/categorias/categoria";

export default defineEventHandler<EventHandlerRequest>(async (event) => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}/api/categorias`;

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

		const response = await $fetch<ApiResponse<Categoria>>(url, {
			method: "POST",
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
