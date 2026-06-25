<template>
	<div>
		<UPageHero
			title="Inventário Comercial"
			description="Aplicação para gerenciar catálogos de mercadorias"
			:links="[{
				label: 'Categorias',
				to: '/categorias',
				target: '_blank',
				color: 'neutral',
				icon: 'i-lucide-layout-grid',
				size: 'xl',
			}, {
				label: 'Produtos',
				to: '/produtos',
				target: '_blank',
				icon: 'i-lucide-package',
				size: 'xl',
				color: 'neutral',
			}]"
		/>

		<UPageSection
			id="features"
			title="Como essa aplicação é feita e funciona"
			description="Essa aplicação web é feita com Nuxt no seu frontend e .NET para seu backend"
			:features="[{
				icon: 'i-lucide-rocket',
				title: 'Nuxt (Frontend)',
				to: 'https://github.com/cStodulski1',
				description: 'Todas as informações necessárias para a execução da aplicação se encontram nesse repositório, não clique aqui se você não for da parte técnica.',
			}, {
				icon: 'i-lucide-palette',
				title: 'Estilizado com Nuxt UI',
				description: 'O module Nuxt UI é a peça chave para estilização e criação dos components desse app, é um modulo do framework Nuxt que usa tailwind/css e vem com vários components prontos para uso.',
			}, {
				icon: 'i-lucide-zap',
				title: 'Site Ligeiro',
				description: 'Otimizado para performance com suporte a SSR/SSG, e implementação pronta para produção. Você vai amar a velocidade desse site.',
			}, {
				icon: 'i-lucide-globe',
				title: '.NET 10 (Backend)',
				to: 'https://github.com/cStodulski',
				description: 'Backend funcionando com .NET 10, usando EF Core e Postgres para persistência dos dados.',
			}, {
				icon: 'i-lucide-code-2',

				title: 'CQRS',
				description: 'Construido com padrão CQRS (Command Query Responsability Segregation).',
			}, {
				icon: 'i-lucide-shield-check',
				title: 'JWT',
				description: 'Aplicação com sistema de autenticação e autorização para garantir a integridade do sistema.',
			}]"
		/>
	</div>
</template>
