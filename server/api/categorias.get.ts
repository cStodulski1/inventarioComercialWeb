import type { ApiResponse } from "~~/shared/types/api-response";
import type { Categoria } from "~~/shared/types/categorias/categoria";
import type { PaginatedResult, PaginationParams } from "~~/shared/types/pagination";

export default defineEventHandler<EventHandlerRequest>(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery<PaginationParams>(event);

  const params = new URLSearchParams({
    pageNumber: String(query.pageNumber ?? 1),
    pageSize: String(query.pageSize ?? 10),
    orderBy: String(query.orderBy ?? "Nome"),
    descending: String(query.descending ?? false),
    ...(query.searchTerm && { searchTerm: String(query.searchTerm) }),
  });

  const response = await $fetch<ApiResponse<PaginatedResult<Categoria>>>(`${config.public.apiBaseUrl}/api/categorias?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.isSuccess) {
    throw createError({
      statusCode: 500,
      statusMessage: response.message,
    });
  }

  return response;
});
