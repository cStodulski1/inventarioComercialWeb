import * as z from "zod";

export const _createAndUpdateCategoriaSchema = z.object({
	nome: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres.").trim(),
	descricao: z.string().trim(),
});

export type CreateUpdateCategoriaRequest = z.output<typeof _createAndUpdateCategoriaSchema>;
