import { describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/agendamentos/route";

function requisicao(corpo: unknown) {
  return new Request("http://localhost/api/agendamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof corpo === "string" ? corpo : JSON.stringify(corpo),
  });
}

describe("POST /api/agendamentos", () => {
  it("cria o pedido e devolve 201 com id", async () => {
    const res = await POST(
      requisicao({ nome: "Maria Souza", telefone: "62988881234" }),
    );
    const corpo = await res.json();

    expect(res.status).toBe(201);
    expect(corpo.ok).toBe(true);
    expect(corpo.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(corpo.status).toBe("solicitado");
  });

  it("devolve 422 apontando os campos inválidos", async () => {
    const res = await POST(requisicao({ nome: "A", telefone: "123" }));
    const corpo = await res.json();

    expect(res.status).toBe(422);
    expect(corpo.ok).toBe(false);
    expect(Object.keys(corpo.campos)).toEqual(
      expect.arrayContaining(["nome", "telefone"]),
    );
  });

  it("devolve 400 quando o corpo não é JSON", async () => {
    const res = await POST(requisicao("isto não é json"));
    expect(res.status).toBe(400);
  });

  it("finge sucesso para o robô que preencheu a isca, sem criar pedido", async () => {
    const res = await POST(
      requisicao({ nome: "Robô", telefone: "62988881234", sobrenome: "spam" }),
    );
    const corpo = await res.json();

    expect(res.status).toBe(200);
    expect(corpo).toEqual({ ok: true, id: null });
  });
});

describe("GET /api/agendamentos", () => {
  it("recusa com 405 e informa o método aceito", async () => {
    const res = await GET();
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
  });
});
