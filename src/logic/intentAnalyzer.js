/**
 * intentAnalyzer.js
 * Un motore euristico per analizzare il linguaggio naturale dell'utente 
 * e mappare l'intenzione al miglior modello AI possibile.
 */

export const recommendToolFromIntent = (intentText) => {
    const textLower = (intentText || "").toLowerCase();
    
    // Contiene parole di coding o sviluppo
    if (textLower.match(/(codice|programm|script|react|bug|python|html|css|javascript|java|sql|database|funzion|architettura|sito web|app|frontend|backend|svilupp|git)/i)) {
        return 'claude';
    } 
    
    // Contiene concetti logici, matematici o di analisi complessa
    if (textLower.match(/(analizz|ragion|dati|matematic|statistic|numeri|grafic|tabell|insight|logica|struttura|archivia|categorizz|excel|csv)/i)) {
        return 'gemini';
    }

    // Contiene volontà di ricerca internet, mercato o citazioni
    if (textLower.match(/(ricerca|fonti|\blink\b|notizie|attuale|trend|mercato|competitor|citazioni|trova|chi è|paper accademici)/i)) {
        return 'perplexity';
    }

    // Fallback naturale per testi, idee creative, riassunti, mail o post
    return 'chatgpt';
};
