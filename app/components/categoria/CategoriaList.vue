<script setup lang="ts">
import type { Categoria } from "~~/shared/types/categorias/categoria";
import { _createAndUpdateCategoriaSchema, type CreateUpdateCategoriaRequest } from "~~/shared/types/categorias/create-update-categoria-request";

const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);

const state = reactive<CreateUpdateCategoriaRequest>({
	nome: "",
	descricao: "",
	id: "",
});

const campoNomeEhValido = computed(() => {
	return _createAndUpdateCategoriaSchema.shape.nome.safeParse(state.nome).success;
});

function abrirModalEditarCategoria(categoria: Categoria) {
	state.nome = categoria.nome;
	state.descricao = categoria.descricao ?? "";
	state.id = categoria.id;

	isEditModalOpen.value = true;
}

function abrirModalDeletarCategoria(categoria: Categoria) {
	state.nome = categoria.nome;
	state.descricao = categoria.descricao ?? "";
	state.id = categoria.id;

	isDeleteModalOpen.value = true;
}

defineProps<{
	categorias: Categoria[];
	showActions?: boolean;
}>();

const emit = defineEmits<{
	edit: [updateCategoria: CreateUpdateCategoriaRequest];
	delete: [id: string | undefined];
}>();

function editarCategoria(data: CreateUpdateCategoriaRequest) {
	emit("edit", data);
	isEditModalOpen.value = false;
}

function deletarCategoria(id: string | undefined) {
	emit("delete", id);
	isDeleteModalOpen.value = false;
}
</script>

<template>
	<UContainer>
		<UPageList
			v-if="categorias.length >= 1"
			class="pt-8 gap-4"
		>
			<UPageCard
				v-for="categoria in categorias"
				:key="categoria.id"
				:title="categoria.nome"
				:description="categoria.descricao !== '' ? categoria.descricao : 'Categoria SEM descrição'"

				:ui="{ wrapper: 'flex flex-col flex-1 items-stretch' }"
			>
				<template #footer>
					<slot name="buttons">
						<div class="flex justify-end gap-2">
							<UButton
								icon="i-lucide-edit"
								size="md"
								color="info"
								class="cursor-pointer"
								@click="abrirModalEditarCategoria(categoria)"
							/>
							<UButton
								icon="i-lucide-trash"
								size="md"
								color="error"
								class="cursor-pointer"
								@click="abrirModalDeletarCategoria(categoria)"
							/>
						</div>
					</slot>
				</template>
			</UPageCard>
		</UpageList>
		<UPageList
			v-else
			class="pt-8"
		>
			<UPageCard
				title="Nenhuma categoria cadastrada."
				:ui="{ wrapper: 'flex flex-col flex-1 items-stretch text-center', title: 'text-red-400' }"
			/>
		</UPageList>
	</UContainer>
	<UModal
		v-model:open="isEditModalOpen"
		title="Editar Categoria"
		:ui="{ footer: 'justify-end' }"
	>
		<template #body>
			<CategoriaForm v-model="state">
				<template #actions>
					<div class="flex justify-end gap-2">
						<UButton
							label="Cancelar"
							color="neutral"
							variant="outline"
							class="cursor-pointer"
							@click="() => { isEditModalOpen = false }"
						/>
						<UButton
							:disabled="!campoNomeEhValido"
							label="Editar"
							icon="i-lucide-edit"
							color="info"
							class="cursor-pointer"
							@click="editarCategoria(state)"
						/>
					</div>
				</template>
			</CategoriaForm>
		</template>
	</UModal>
	<UModal
		v-model:open="isDeleteModalOpen"
		title="Excluir Categoria"
		:ui="{ footer: 'justify-end' }"
	>
		<template #body>
			<UAlert
				color="error"
				title="Tem certeza ?"
				description="Essa ação não pode ser desfeita!"
				icon="i-lucide-trash"
			/>
		</template>
		<template #footer>
			<div class="flex gap-2">
				<UButton
					color="neutral"
					label="Cancelar"
					@click="() => { isDeleteModalOpen = false }"
				/>
				<UButton
					label="Excluir"
					color="error"
					@click="deletarCategoria(state.id)"
				/>
			</div>
		</template>
	</UModal>
</template>
