import type { Agendamento, PedidoAgendamento } from "./tipos";

/**
 * A costura para o backend que ainda não existe.
 *
 * Quando a clínica tiver agenda de verdade, escreva uma classe nova que
 * implemente esta interface (Postgres, Supabase, Google Calendar, o que for) e
 * troque a linha da fábrica no fim do arquivo. Nem a rota nem o formulário
 * precisam saber qual é a implementação.
 */
export interface RepositorioAgendamentos {
  criar(pedido: PedidoAgendamento): Promise<Agendamento>;
  listar(): Promise<Agendamento[]>;
}

/**
 * Implementação atual: só valida, carimba e registra no log da Vercel.
 *
 * ATENÇÃO — isto não persiste nada. A entrega real do pedido acontece no
 * formulário, que leva a pessoa ao WhatsApp da clínica com a mensagem montada.
 * Não troque esse fluxo por "confirmação na tela" sem antes plugar aqui um
 * destino que alguém de fato leia. Um pedido que some é pior do que formulário
 * nenhum.
 */
class RepositorioEmMemoria implements RepositorioAgendamentos {
  private readonly registros: Agendamento[] = [];

  async criar(pedido: PedidoAgendamento): Promise<Agendamento> {
    const agendamento: Agendamento = {
      ...pedido,
      id: crypto.randomUUID(),
      criadoEm: new Date().toISOString(),
      status: "solicitado",
      origem: "site",
    };

    this.registros.push(agendamento);

    console.info("[agendamento] pedido recebido", {
      id: agendamento.id,
      tratamento: agendamento.tratamento,
      periodo: agendamento.periodo,
      criadoEm: agendamento.criadoEm,
      // Nome e telefone ficam fora do log de propósito: é dado pessoal de
      // paciente e o log da plataforma não é lugar para guardar isso.
    });

    return agendamento;
  }

  async listar(): Promise<Agendamento[]> {
    return [...this.registros];
  }
}

let instancia: RepositorioAgendamentos | null = null;

export function obterRepositorio(): RepositorioAgendamentos {
  instancia ??= new RepositorioEmMemoria();
  return instancia;
}
