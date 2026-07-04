import * as z from "zod";

export const _createAndUpdateCategoriaSchema = z.object({
	id: z.uuid().optional(),
	nome: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres.").trim(),
	descricao: z.string().max(500, "A descrição pode ter no máximo 500 caracteres").trim(),
});

export type CreateUpdateCategoriaRequest = z.output<typeof _createAndUpdateCategoriaSchema>;
