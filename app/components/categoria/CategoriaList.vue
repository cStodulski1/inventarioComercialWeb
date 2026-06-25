<script setup lang="ts">
import type { Categoria } from "~~/shared/types/categorias/categoria";

defineProps<{
	categorias: Categoria[];
}>();
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
				:description="categoria.descricao !== '' ? categoria.descricao : 'Categoria sem descrição*'"

				:ui="{ wrapper: 'flex flex-col flex-1 items-stretch' }"
			>
				<template #footer>
					<div class="flex justify-end gap-2">
						<UButton
							icon="i-lucide-edit"
							size="md"
							color="info"
						/>
						<UButton
							icon="i-lucide-trash"
							size="md"
							color="error"
						/>
					</div>
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
</template>
