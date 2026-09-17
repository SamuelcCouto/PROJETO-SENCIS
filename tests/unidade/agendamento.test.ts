import { describe, expect, it } from "vitest";
import {
  nomeDoTratamento,
  pedidoAgendamentoSchema,
  telefoneFormatado,
} from "@/lib/agendamento/tipos";
import { tratamentos } from "@/lib/tratamentos";

const pedidoValido = {
  nome: "Maria Souza",
  telefone: "(62) 98888-1234",
  tratamento: "estetica",
  periodo: "manha",
};

describe("pedidoAgendamentoSchema", () => {
  it("aceita um pedido completo", () => {
    expect(pedidoAgendamentoSchema.safeParse(pedidoValido).success).toBe(true);
  });

  it("normaliza o telefone para só dígitos, como a pessoa digitar", () => {
    for (const digitado of [
      "(62) 98888-1234",
      "62 98888 1234",
      "62988881234",
    ]) {
      const r = pedidoAgendamentoSchema.parse({
        ...pedidoValido,
        telefone: digitado,
      });
      expect(r.telefone).toBe("62988881234");
    }
  });

  it("aceita fixo com DDD (10 dígitos) e celular (11)", () => {
    expect(
      pedidoAgendamentoSchema.safeParse({
        ...pedidoValido,
        telefone: "6232221111",
      }).success,
    ).toBe(true);
    expect(
      pedidoAgendamentoSchema.safeParse({
        ...pedidoValido,
        telefone: "62988881234",
      }).success,
    ).toBe(true);
  });

  it("recusa telefone sem DDD ou com dígitos a mais", () => {
    for (const telefone of ["98888-1234", "123", "629888812345"]) {
      const r = pedidoAgendamentoSchema.safeParse({
        ...pedidoValido,
        telefone,
      });
      expect(r.success, telefone).toBe(false);
    }
  });

  it("recusa nome vazio ou de uma letra", () => {
    expect(
      pedidoAgendamentoSchema.safeParse({ ...pedidoValido, nome: "A" }).success,
    ).toBe(false);
    expect(
      pedidoAgendamentoSchema.safeParse({ ...pedidoValido, nome: "   " })
        .success,
    ).toBe(false);
  });

  it("usa 'nao-sei' e 'qualquer' quando tratamento e período não vêm", () => {
    const r = pedidoAgendamentoSchema.parse({
      nome: "Maria",
      telefone: "62988881234",
    });
    expect(r.tratamento).toBe("nao-sei");
    expect(r.periodo).toBe("qualquer");
  });

  it("aceita todos os tratamentos cadastrados, e só eles", () => {
    for (const t of tratamentos) {
      expect(
        pedidoAgendamentoSchema.safeParse({ ...pedidoValido, tratamento: t.id })
          .success,
        t.id,
      ).toBe(true);
    }
    expect(
      pedidoAgendamentoSchema.safeParse({
        ...pedidoValido,
        tratamento: "inventado",
      }).success,
    ).toBe(false);
  });

  it("não rejeita o campo isca — quem descarta é a rota, em silêncio", () => {
    // Se o schema recusasse, o erro de validação nomearia o campo e ensinaria o
    // robô a deixá-lo em branco na próxima tentativa.
    const r = pedidoAgendamentoSchema.safeParse({
      ...pedidoValido,
      sobrenome: "spam",
    });
    expect(r.success).toBe(true);
  });
});

describe("telefoneFormatado", () => {
  it("formata celular e fixo", () => {
    expect(telefoneFormatado("62988881234")).toBe("(62) 98888-1234");
    expect(telefoneFormatado("6232221111")).toBe("(62) 3222-1111");
  });

  it("devolve como veio o que não reconhece", () => {
    expect(telefoneFormatado("123")).toBe("123");
  });
});

describe("nomeDoTratamento", () => {
  it("traduz o id para o nome que a recepção lê no WhatsApp", () => {
    expect(nomeDoTratamento("estetica")).toBe("Estética do sorriso");
    expect(nomeDoTratamento("nao-sei")).toMatch(/avaliar/);
  });
});
