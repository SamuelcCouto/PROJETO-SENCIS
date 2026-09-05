import { NextResponse } from "next/server";
import { pedidoAgendamentoSchema } from "@/lib/agendamento/tipos";
import { obterRepositorio } from "@/lib/agendamento/repositorio";

/**
 * POST /api/agendamentos
 *
 * A porta de entrada do backend de agendamentos. Já existe, já valida e já tem
 * formato de resposta estável — falta só o destino do outro lado do repositório.
 * Qualquer cliente futuro (app, bot de WhatsApp, automação) fala com esta rota.
 */

export const runtime = "nodejs";
// Nada aqui pode ser pré-renderizado: é escrita, sempre dinâmica.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let corpo: unknown;

  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, erro: "Corpo da requisição não é JSON válido." },
      { status: 400 },
    );
  }

  const resultado = pedidoAgendamentoSchema.safeParse(corpo);

  if (!resultado.success) {
    return NextResponse.json(
      {
        ok: false,
        erro: "Confira os campos destacados.",
        campos: resultado.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Isca preenchida: responde 200 para o robô não aprender nada, e descarta.
  if (resultado.data.sobrenome) {
    return NextResponse.json({ ok: true, id: null }, { status: 200 });
  }

  const agendamento = await obterRepositorio().criar(resultado.data);

  return NextResponse.json(
    { ok: true, id: agendamento.id, status: agendamento.status },
    { status: 201 },
  );
}

export async function GET() {
  return NextResponse.json(
    { ok: false, erro: "Use POST para solicitar um agendamento." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
