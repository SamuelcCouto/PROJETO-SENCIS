import Image from "next/image";
import { linkWhatsapp } from "@/lib/clinica";
import cameraIntraoral from "@/public/fotos/camera-intraoral.jpg";
import cameraIntraoralDetalhe from "@/public/fotos/camera-intraoral-detalhe.jpg";

/**
 * A câmera intraoral.
 *
 * O texto é da clínica, condensado do que ela escreveu para o Instagram — lá
 * cabia frase solta por linha; aqui vira parágrafo, e o que era caixa-alta de
 * ênfase de WhatsApp vira hierarquia tipográfica. Nada foi inventado: o título,
 * a frase de fechamento e a legenda são palavras dela.
 *
 * A seção também cobre uma busca que nenhuma outra cobria: quem procura
 * "dentista que mostra o dente" ou "câmera intraoral" não achava nada aqui.
 */
export function CameraIntraoral() {
  return (
    <section
      id="camera-intraoral"
      className="border-t border-linha py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <div>
            <h2 className="font-display text-[2.25rem] leading-[1.08] text-ink sm:text-[2.75rem]">
              Você vê. Você entende. Você decide.
            </h2>

            <p className="mt-6 max-w-[56ch] text-lg text-ink">
              Na Sencis, cuidar também é tornar visível.
            </p>

            <div className="mt-5 max-w-[56ch] space-y-4 text-texto">
              <p>
                A câmera intraoral amplia a imagem dos seus dentes e acompanha
                cada detalhe em tempo real, na tela, junto com você. Pequena no
                tamanho, grande na experiência: mostra o que passa despercebido
                a olho nu — cáries, desgastes, fraturas, infiltrações e
                alterações na gengiva — e ainda registra o acompanhamento da sua
                saúde bucal.
              </p>
              <p>
                O diferencial não está apenas na tecnologia. Está em não falar
                do seu sorriso sem mostrar o que estamos vendo.
              </p>
              <p>
                Você acompanha, pergunta, entende. E só então, juntos,
                conversamos sobre as possibilidades de tratamento.
              </p>
            </div>

            <p className="font-display mt-7 max-w-[38ch] text-2xl text-ink">
              Diagnóstico não precisa ser algo que você recebe. Pode ser algo
              que você compreende.
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
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-[var(--radius-photo)] bg-nude shadow-foto">
                <Image
                  src={cameraIntraoral}
                  alt="Paciente deitada na cadeira segurando um tablet que mostra, ampliado e ao vivo, o próprio dente sendo examinado"
                  placeholder="blur"
                  sizes="(max-width: 1024px) 50vw, 23vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-[var(--radius-photo)] bg-nude shadow-foto">
                <Image
                  src={cameraIntraoralDetalhe}
                  alt="Tablet mostrando a imagem ampliada de um dente captada pela câmera intraoral durante o atendimento"
                  placeholder="blur"
                  sizes="(max-width: 1024px) 50vw, 23vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <figcaption className="mt-4 max-w-[46ch] text-sm text-texto">
              Tecnologia que aproxima você do seu sorriso. Ver para entender,
              entender para cuidar.
            </figcaption>

            {/* Do documento de essência da marca, palavra por palavra. */}
            <p className="font-display mt-8 max-w-[30ch] border-l-2 border-azul pl-5 text-xl text-ink">
              A tecnologia não existe para impressionar. Existe para aproximar.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}
