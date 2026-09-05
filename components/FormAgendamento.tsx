"use client";

import { useMemo, useState } from "react";
import { tratamentos } from "@/lib/tratamentos";
import { clinica } from "@/lib/clinica";
import {
  nomeDoTratamento,
  periodos,
  rotuloPeriodo,
  telefoneFormatado,
  type Periodo,
} from "@/lib/agendamento/tipos";
import { IconeWhatsapp } from "./icones";

type Estado = "parado" | "enviando" | "sucesso";
type Erros = Partial<Record<string, string[]>>;

/**
 * Pedido de agendamento.
 *
 * O envio passa pela rota /api/agendamentos — que já valida e registra — e
 * depois leva a pessoa ao WhatsApp com a mensagem montada. Enquanto não houver
 * agenda de verdade do outro lado, a entrega precisa acontecer num canal que a
 * clínica lê todo dia; formulário que só mostra "recebemos!" e não avisa
 * ninguém perde paciente.
 */
export function FormAgendamento() {
  const [estado, setEstado] = useState<Estado>("parado");
  const [erros, setErros] = useState<Erros>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tratamento, setTratamento] = useState("nao-sei");
  const [periodo, setPeriodo] = useState<string>("qualquer");
  const [observacoes, setObservacoes] = useState("");
  const [sobrenome, setSobrenome] = useState(""); // isca

  const linkConversa = useMemo(() => {
    const linhas = [
      "Olá! Quero agendar uma avaliação na Sencis.",
      "",
      `Nome: ${nome}`,
      `Telefone: ${telefoneFormatado(telefone.replace(/\D/g, ""))}`,
      `Assunto: ${nomeDoTratamento(tratamento)}`,
      `Melhor período: ${rotuloPeriodo[periodo as Periodo]}`,
    ];
    if (observacoes.trim()) linhas.push(`Observação: ${observacoes.trim()}`);
    return `https://wa.me/${clinica.whatsapp.numero}?text=${encodeURIComponent(linhas.join("\n"))}`;
  }, [nome, telefone, tratamento, periodo, observacoes]);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setEstado("enviando");
    setErros({});
    setErroGeral(null);

    try {
      const resposta = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          telefone,
          tratamento,
          periodo,
          observacoes: observacoes || undefined,
          sobrenome,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErros(dados.campos ?? {});
        setErroGeral(dados.erro ?? "Não foi possível enviar agora.");
        setEstado("parado");
        return;
      }

      setEstado("sucesso");
      // Navegação de topo não é bloqueada como pop-up. Se ainda assim o
      // navegador segurar, o link de reserva fica visível na tela de sucesso.
      window.location.href = linkConversa;
    } catch {
      setErroGeral(
        "A conexão falhou. Chame direto no WhatsApp que resolvemos por lá.",
      );
      setEstado("parado");
    }
  }

  const campo =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-sand/60 transition-colors focus:border-brass-lit focus:outline-none focus:ring-0";
  const rotulo = "block text-sm font-medium text-sand";

  if (estado === "sucesso") {
    return (
      <div className="rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-8 text-center">
        <h3 className="font-display text-2xl text-white">
          Pedido montado. Falta um toque.
        </h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-sand/80">
          Abrimos o WhatsApp da clínica com seus dados já preenchidos. Envie a
          mensagem para a recepção receber o pedido e confirmar o horário.
        </p>
        <a
          href={linkConversa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-brass-lit px-7 py-4 font-medium text-ink transition-colors hover:bg-white"
        >
          <IconeWhatsapp className="h-5 w-5" />
          Abrir a conversa
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className={rotulo}>
            Seu nome
          </label>
          <input
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            required
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={erros.nome ? "erro-nome" : undefined}
            className={`mt-2 ${campo}`}
            placeholder="Como podemos te chamar"
          />
          {erros.nome && (
            <p id="erro-nome" className="mt-2 text-sm text-brass-lit">
              {erros.nome[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="telefone" className={rotulo}>
            WhatsApp com DDD
          </label>
          <input
            id="telefone"
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(erros.telefone)}
            aria-describedby={erros.telefone ? "erro-telefone" : undefined}
            className={`mt-2 ${campo}`}
            placeholder="(62) 90000-0000"
          />
          {erros.telefone && (
            <p id="erro-telefone" className="mt-2 text-sm text-brass-lit">
              {erros.telefone[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="tratamento" className={rotulo}>
          Sobre o que você quer falar
        </label>
        <select
          id="tratamento"
          name="tratamento"
          value={tratamento}
          onChange={(e) => setTratamento(e.target.value)}
          className={`select-seta mt-2 appearance-none ${campo}`}
        >
          <option value="nao-sei">Ainda não sei — quero uma avaliação</option>
          {tratamentos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={rotulo}>Melhor período</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {periodos.map((p) => (
            <label
              key={p}
              className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-colors ${
                periodo === p
                  ? "border-brass-lit bg-brass-lit text-ink"
                  : "border-white/15 text-sand hover:border-white/35"
              }`}
            >
              <input
                type="radio"
                name="periodo"
                value={p}
                checked={periodo === p}
                onChange={() => setPeriodo(p)}
                className="sr-only"
              />
              {rotuloPeriodo[p]}
            </label>
          ))}
        </div>
        <p className="mt-2.5 text-sm text-sand/70">
          Atendemos das 08:30 às 12:00 e das 13:00 às 18:00, e aos sábados até
          meio-dia.
        </p>
      </fieldset>

      <div>
        <label htmlFor="observacoes" className={rotulo}>
          Quer adiantar alguma coisa?{" "}
          <span className="text-sand/60">(opcional)</span>
        </label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          rows={3}
          maxLength={600}
          className={`mt-2 resize-y ${campo}`}
          placeholder="Ex.: tenho medo de dentista, ou estou com dor do lado direito"
        />
      </div>

      {/* Isca anti-robô: fora da tela, fora da ordem de tabulação, escondida de leitores de tela. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="sobrenome">Não preencha este campo</label>
        <input
          id="sobrenome"
          name="sobrenome"
          tabIndex={-1}
          autoComplete="off"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
      </div>

      {erroGeral && (
        <p role="alert" className="text-sm text-brass-lit">
          {erroGeral}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brass-lit px-7 py-4 font-medium text-ink transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <IconeWhatsapp className="h-5 w-5" />
          {estado === "enviando" ? "Enviando…" : "Enviar pedido"}
        </button>
        <p className="text-sm text-sand/70">
          A recepção confirma o horário pelo WhatsApp.
        </p>
      </div>
    </form>
  );
}
