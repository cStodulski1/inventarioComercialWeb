<script setup lang="ts">
import type { Categoria } from "~~/shared/types/categorias/categoria";
import type { CreateUpdateCategoriaRequest } from "~~/shared/types/categorias/create-update-categoria-request";
import { FetchError } from "ofetch";

const page = ref(1);
const search = ref("");

const { data: response, refresh } = await useFetch<ApiResponse<PaginatedResult<Categoria>>>("/api/categorias", {
	query: {
		pageNumber: page,
		searchTerm: search,
	},
});

const toast = useToast();
const { update } = useCategorias();

async function testeEmit(data: CreateUpdateCategoriaRequest) {
	try {
		const response = await update(data);
		toast.add({ title: "Categoria atualizada!", description: response.data.id, color: "success", icon: "i-lucide-circle-check" });
		refresh();
	}
	catch (err) {
		if (err instanceof FetchError) {
			const errorMessage = err.data.statusMessage;
			toast.add({
				title: "Erro ao editar categoria",
				description: `Erro: ${errorMessage}`,
				color: "error",
				icon: "i-lucide-circle-x",
			});
		}
		else {
			toast.add({ title: "Erro desconhecido", color: "error" });
		}
	}
}
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
			@edit="testeEmit"
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
