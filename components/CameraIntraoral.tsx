import Image from "next/image";
import { linkWhatsapp } from "@/lib/clinica";
import cameraIntraoral from "@/public/fotos/camera-intraoral.jpg";

/**
 * A câmera intraoral.
 *
 * Esta seção existe porque a foto prova a tese do site inteiro. O resto da
 * página *afirma* que o plano nasce de uma conversa; aqui dá para ver a
 * paciente olhando o próprio dente na tela enquanto é examinada. Argumento que
 * se demonstra vale mais que argumento que se repete.
 *
 * Também cobre uma busca que nenhuma outra seção cobria: quem procura
 * "dentista que mostra o dente" ou "câmera intraoral" não achava nada aqui.
 */
export function CameraIntraoral() {
  return (
    <section
      id="camera-intraoral"
      className="border-t border-linha py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <h2 className="font-display text-[2.25rem] leading-[1.08] text-ink sm:text-[2.75rem]">
              Você vê o mesmo que a dentista vê
            </h2>

            <div className="mt-6 max-w-[56ch] space-y-4 text-texto">
              <p>
                Uma câmera do tamanho de uma caneta entra na boca e joga o seu
                dente ampliado na tela, ao vivo. Você acompanha no mesmo momento
                em que a dentista examina — deitada na cadeira, sem precisar
                acreditar em nada no escuro.
              </p>
              <p>
                É a diferença entre ouvir “tem uma cárie aqui” e ver a cárie. O
                plano de tratamento deixa de ser uma lista de nomes técnicos e
                vira uma coisa que dá para conferir com os próprios olhos, antes
                de decidir qualquer coisa.
              </p>
            </div>

            <p className="font-display mt-7 max-w-[30ch] text-2xl text-ink">
              Nada começa antes de você entender o porquê.
            </p>

            <a
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-ink px-7 py-4 font-medium text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Agendar uma avaliação
            </a>
          </div>

          <figure>
            <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-photo)] bg-nude shadow-[0_30px_70px_-36px_rgba(27,34,51,0.45)]">
              <Image
                src={cameraIntraoral}
                alt="Paciente deitada na cadeira segurando um tablet que mostra, ampliado e ao vivo, o próprio dente sendo examinado pela câmera intraoral"
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 max-w-[46ch] text-sm text-texto">
              O exame acontece na tela junto com você, não só no olho de quem
              está de pé.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
