import { z } from "zod";
import { tratamentos } from "@/lib/tratamentos";

/**
 * Contrato do pedido de agendamento.
 *
 * Este é o ponto de encaixe do backend futuro. Hoje o pedido é validado aqui,
 * registrado pelo repositório e entregue à clínica via WhatsApp; quando existir
 * agenda de verdade, só a implementação do repositório muda — este schema, a
 * rota e o formulário continuam iguais.
 */

/** "nao-sei" primeiro garante a tupla não-vazia que o z.enum exige. */
const valoresTratamento: [string, ...string[]] = [
  "nao-sei",
  ...tratamentos.map((t) => t.id),
];

export const periodos = ["manha", "tarde", "qualquer"] as const;
export type Periodo = (typeof periodos)[number];

/**
 * Rótulos curtos de propósito: com o horário dentro de cada pílula, os três
 * botões não cabem lado a lado no celular e quebram em duas linhas tortas. O
 * horário aparece uma vez, embaixo do grupo.
 */
export const rotuloPeriodo: Record<Periodo, string> = {
  manha: "Manhã",
  tarde: "Tarde",
  qualquer: "Tanto faz",
};

export const pedidoAgendamentoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Escreva seu nome.")
    .max(120, "Nome muito longo."),

  // Aceita o que a pessoa digitar e valida pela quantidade de dígitos:
  // fixo com DDD tem 10, celular tem 11.
  telefone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ""))
    .refine(
      (v) => v.length === 10 || v.length === 11,
      "Telefone com DDD, por favor. Ex.: (62) 99227-2783.",
    ),

  tratamento: z.enum(valoresTratamento).default("nao-sei"),

  periodo: z.enum(periodos).default("qualquer"),

  observacoes: z.string().trim().max(600, "Mensagem muito longa.").optional(),

  /**
   * Campo isca: fica escondido no formulário, então só robô preenche.
   *
   * Aceita qualquer texto de propósito. Rejeitar aqui devolveria um erro de
   * validação apontando o campo pelo nome — ou seja, ensinaria ao robô
   * exatamente o que não preencher da próxima vez. Quem descarta é a rota, que
   * responde 200 como se tivesse dado tudo certo.
   */
  sobrenome: z.string().optional(),
});

export type PedidoAgendamento = z.infer<typeof pedidoAgendamentoSchema>;

export type Agendamento = PedidoAgendamento & {
  id: string;
  criadoEm: string;
  status: "solicitado" | "confirmado" | "cancelado";
  origem: "site";
};

export function nomeDoTratamento(id: string): string {
  if (id === "nao-sei") return "Ainda não sei / quero avaliar";
  return tratamentos.find((t) => t.id === id)?.nome ?? id;
}

export function telefoneFormatado(digitos: string): string {
  if (digitos.length === 11) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
  }
  if (digitos.length === 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return digitos;
}
