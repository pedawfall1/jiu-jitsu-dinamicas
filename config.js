/**
 * Configuração do site (página de vendas + quiz).
 *
 * Cada campo vazio desliga o recurso correspondente:
 *   - metaPixelId / utmifyPixelId vazios -> o pixel não é carregado;
 *   - wistiaMediaId vazio -> a capa do vídeo aparece, mas não abre o player;
 *   - link de checkout vazio -> o botão continua na página sem destino;
 *   - whatsapp vazio     -> o botão flutuante fica escondido.
 */
window.SITE_CONFIG = {
  // ID do Pixel da Meta, ex.: "1234567890123456".
  metaPixelId: "1059796013613866",

  // ID do Pixel da UTMify (rastreia UTMs e atribui as vendas).
  utmifyPixelId: "6a8750047b15a79c1cf556ad",

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
 * Pixels de rastreamento (Meta + UTMify).
 * Rodam automaticamente em toda página que carrega este config.js — ou seja,
 * a página de vendas e todas as etapas do quiz. Cada ID vazio desliga o pixel.
 */
(function initTracking() {
  var cfg = window.SITE_CONFIG || {};

  // Meta Pixel
  if (cfg.metaPixelId) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.metaPixelId);
    fbq('track', 'PageView');
  }

  // UTMify Pixel
  if (cfg.utmifyPixelId) {
    window.pixelId = cfg.utmifyPixelId;
    var u = document.createElement("script");
    u.async = true;
    u.defer = true;
    u.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
    (document.head || document.documentElement).appendChild(u);
  }
})();

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
