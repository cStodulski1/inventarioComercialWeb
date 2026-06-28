<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { useCategorias } from "~/composables/useCategorias";
import { _createCategoriaSchema, type CreateCategoriaRequest } from "~~/shared/types/categorias/create-categoria-request";

const { create } = useCategorias();

const state = reactive<Partial<CreateCategoriaRequest>>({
	nome: "",
	descricao: "",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<CreateCategoriaRequest>) {
	const response = await create(event.data);
	toast.add({ title: "Nova Categoria criada pela API", description: response.isSuccess.toString() });
	// toast.add({ title: "Sucesso", description: response.data.nome, color: "success" });
}
</script>

<template>
	<UContainer>
		<UForm
			:schema="_createCategoriaSchema"
			:state="state"
			class="space-y-4"
			@submit.prevent="onSubmit"
		>
			<UFormField
				label="Nome"
				name="nome"
			>
				<UInput
					v-model="state.nome"
					class="w-full"
				/>
			</UFormField>

			<UFormField
				label="Descricao"
				name="descricao"
			>
				<UTextarea
					v-model="state.descricao"
					:maxlength="500"
					class="w-full"
				/>
			</UFormField>

			<div class="flex justify-end">
				<UButton
					type="submit"
					icon="i-lucide-save"
				>
					Salvar
				</UButton>
			</div>
		</UForm>
	</UContainer>
</template>
