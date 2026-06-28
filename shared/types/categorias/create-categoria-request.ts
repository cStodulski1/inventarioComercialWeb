import * as z from "zod";

export const _createCategoriaSchema = z.object({
	nome: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres.").trim(),
	descricao: z.string().trim(),
});

export type CreateCategoriaRequest = z.output<typeof _createCategoriaSchema>;
