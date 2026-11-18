/*
 * Configurazione della pagina donazioni di Frenél Studio.
 * Per cambiare link, importi o il messaggio della serata basta modificare questo file.
 */
window.FRENEL = {
  // Importi proposti (in euro). L'utente può sempre inserire un importo libero.
  importi: [3, 5, 10, 20],
  importoPredefinito: 5,

  // Indirizzo pubblico della pagina (serve per il ritorno da PayPal).
  baseUrl: "https://frenelstudio.github.io/donazioni/",

  paypal: {
    email: "frenelstudio@gmail.com",
    causale: "Contributo libero a Frenél Studio",
  },

  satispay: {
    link: "https://web.satispay.com/download/qrcode/S6Y-CON--DD748DE2-C040-4B2F-BBBC-F68F133392A8?locale=it",
  },

  social: {
    instagram: "https://www.instagram.com/frenelstudio/",
    youtube: "https://www.youtube.com/@Fren%C3%A9lStudio",
  },

  // Messaggio mostrato solo nel giorno della serata (fuso orario di Roma).
  // Aggiungere una riga per ogni nuova serata.
  serate: [
    { data: "2026-12-16", testo: "Stasera siamo al Cinema Fratelli Marx. Grazie di essere in sala." },
  ],
};
