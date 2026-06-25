import { FetchError } from "ofetch";
import type { CreateCategoriaRequest } from "~~/shared/types/categorias/create-categoria-request";
import type { ApiResponse } from "#shared/types/api-response";

export default defineEventHandler<EventHandlerRequest>(async (event) => {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBaseUrl}/api/categorias`;

  try {
    const body = await readBody<CreateCategoriaRequest>(event);
    if (!body.nome || body.nome.trim() === "") {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        data: "O campo nome é obrigatório",
      });
    }

    const response = await $fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        nome: body.nome.trim(),
        descricao: body.descricao || "",
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
