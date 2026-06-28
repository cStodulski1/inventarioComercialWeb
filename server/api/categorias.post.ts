import { FetchError } from "ofetch";
import { _createCategoriaSchema, type CreateCategoriaRequest } from "~~/shared/types/categorias/create-categoria-request";
import type { ApiResponse } from "#shared/types/api-response";

export default defineEventHandler<EventHandlerRequest>(async (event) => {
	const config = useRuntimeConfig();
	const url = `${config.public.apiBaseUrl}/api/categorias`;

	try {
		const body = await readBody<CreateCategoriaRequest>(event);
		const result = _createCategoriaSchema.safeParse(body);
		if (!result.success) {
			throw createError({
				statusCode: 400,
				statusMessage: "Bad Request",
				data: result.error.message,
			});
		}

		const response = await $fetch(url, {
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
			const backendError = error.data as ApiResponse<null> | undefined;
			throw createError({
				statusCode: error.status || 500,
				statusMessage: backendError?.message,
				data: backendError?.data,
			});
		}

		throw createError({
			statusCode: 500,
			statusMessage: "Erro desconhecido",
		});
	}
});
