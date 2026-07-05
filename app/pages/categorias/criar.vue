<script setup lang="ts">
import { useCategorias } from "~/composables/useCategorias";
import { _createAndUpdateCategoriaSchema, type CreateUpdateCategoriaRequest } from "~~/shared/types/categorias/create-update-categoria-request";
import { FetchError } from "ofetch";

const { create } = useCategorias();

const state = reactive<Partial<CreateUpdateCategoriaRequest>>({
	nome: "",
	descricao: "",
});

const toast = useToast();
async function criarCategoria(data: CreateUpdateCategoriaRequest) {
	try {
		const response = await create(data);
		toast.add({
			title: "Categoria criada com sucesso",
			description: `Nome: ${response.data.nome}`,
			color: "success",
			icon: "i-lucide-circle-check",
		});
		state.nome = "";
		state.descricao = "";
	}
	catch (err) {
		if (err instanceof FetchError) {
			const errorMessage = err.data.statusMessage;
			toast.add({
				title: "Erro ao criar categoria",
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
	<UContainer>
		<CategoriaForm
			v-model="state"
			@submit="criarCategoria"
		/>
	</UContainer>
</template>
