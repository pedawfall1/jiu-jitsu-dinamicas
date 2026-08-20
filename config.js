/**
 * Configuração da landing page.
 *
 * Os valores do site original foram removidos — preencha com os seus
 * antes de publicar. Enquanto um campo estiver vazio:
 *   - metaPixelId vazio  -> nenhum rastreamento é disparado;
 *   - wistiaMediaId vazio -> a capa do vídeo aparece, mas não abre o player;
 *   - link de checkout vazio -> o botão continua na página sem destino;
 *   - whatsapp vazio     -> o botão flutuante fica escondido.
 */
window.SITE_CONFIG = {
  // ID do Pixel da Meta, ex.: "1234567890123456".
  metaPixelId: "",

  // ID do vídeo da Wistia no topo da página de vendas (index.html).
  wistiaMediaId: "i4q5pjvdok",

  // ID do vídeo da Wistia usado na VSL do quiz (quiz/vsl.html).
  vslMediaId: "1f7llb243d",

  links: {
    checkoutPremium: "", // botão "QUERO O PREMIUM" — R$ 19,90
    checkoutUpsell:  "", // botão do modal — R$ 14,90
    checkoutBasico:  "", // link "Continuar com o básico" — R$ 10,00
    whatsapp:        "", // ex.: "https://wa.me/5511999999999"
  },

  // Contador de escassez (em segundos).
  timerStartSeconds: 7 * 60 + 41,
  timerResetSeconds: 57 * 60 + 41,
};

/**
 * Função utilitária para navegar entre as páginas do quiz.
 * Resolve problemas de caminhos relativos quando hospedado no Vercel (cleanUrls)
 * e também mantém o funcionamento local (file://).
 */
window.navigateQuiz = function(pageName) {
  if (window.location.protocol === 'file:') {
    window.location.href = pageName + '.html';
  } else {
    // Força o caminho absoluto da pasta quiz no Vercel
    window.location.href = '/quiz/' + pageName;
  }
};
