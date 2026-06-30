<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { _createAndUpdateCategoriaSchema, type CreateUpdateCategoriaRequest } from "~~/shared/types/categorias/create-update-categoria-request";

const state = defineModel<Partial<CreateUpdateCategoriaRequest>>({
	required: true,
});

const emit = defineEmits<{
	submit: [CreateUpdateCategoriaRequest];
}>();

function onSubmit(event: FormSubmitEvent<CreateUpdateCategoriaRequest>) {
	emit("submit", event.data);
}
</script>

<template>
	<UForm
		:schema="_createAndUpdateCategoriaSchema"
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
				class="cursor-pointer"
			>
				Salvar
			</UButton>
		</div>
	</UForm>
</template>
