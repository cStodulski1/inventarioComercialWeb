<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
	{
		label: "Categorias",
		icon: "i-lucide-layout-grid",
		children: [
			{
				label: "Cadastrar",
				icon: "i-lucide-plus",
				to: "/cateogrias/criar",
			},
			{
				label: "Listar",
				icon: "i-lucide-list-sort-ascending",
				to: "/categorias/listar",
			},
		],
	},
	{
		label: "Produtos",
		icon: "i-lucide-package",
		children: [
			{
				label: "Cadastrar",
				icon: "i-lucide-plus",
				to: "/produtos/criar",
			},
			{
				label: "Listar",
				icon: "i-lucide-list-sort-ascending",
				to: "/produtos/listar",
			},
		],
	},

]);
</script>

<template>
	<UNavigationMenu :items="items" />
</template>
