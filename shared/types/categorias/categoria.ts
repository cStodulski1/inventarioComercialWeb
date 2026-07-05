import * as z from "zod";

const _categoriaSchema = z.object({
	id: z.guid(),
	nome: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres."),
	descricao: z.string().trim(),
	quantidadeDeProdutos: z.number().optional(),
});

export type Categoria = z.output<typeof _categoriaSchema>;
