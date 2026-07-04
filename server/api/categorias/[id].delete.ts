import type { FetchError } from "ofetch";

export default defineEventHandler<EventHandlerRequest>(async (event) => {
	const config = useRuntimeConfig();
	const id = getRouterParam(event, "id");
	const url = `${config.public.apiBaseUrl}/api/categorias/${id}`;

	try {
		await $fetch(url, {
			method: "DELETE",
		});

		return;
	}
	catch (error) {
		const err = error as FetchError;

		throw createError({
			statusCode: err.status ?? 500,
			statusText: err.data.message ?? "Erro desconhecido",
			data: err.data,
		});
	}
});
