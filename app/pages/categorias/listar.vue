<script setup lang="ts">
import type { Categoria } from "~~/shared/types/categorias/categoria";

const page = ref(1);
const search = ref("");

const { data: response } = await useFetch<ApiResponse<PaginatedResult<Categoria>>>("/api/categorias", {
	query: {
		pageNumber: page,
		searchTerm: search,
	},
});
</script>

<template>
	<div>
		<div class="flex justify-center pt-8">
			<UInput
				v-model="search"
				size="xl"
				class="w-full max-w-md"
				icon="i-lucide-search"
				placeholder="Pesquisar..."
			/>
		</div>
		<CategoriaList
			:categorias="response?.data.items ?? []"
		/>
		<div class="flex justify-center mt-4">
			<UPagination
				v-model:page="page"
				:items-per-page="response?.data.pageSize ?? 10"
				:total="response?.data.totalCount ?? 0"
			/>
		</div>
	</div>
</template>
