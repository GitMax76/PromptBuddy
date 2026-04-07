import { describe, it, expect } from 'vitest';
import { recommendToolFromIntent } from './intentAnalyzer';

describe('Intent Analyzer - Heuristic Engine (50 Test Cases)', () => {

    const testCases = [
        // --- 1. Sviluppo e Codice (Expected: Claude) ---
        { intent: "Voglio che mi fai il debug di questo codice", expected: "claude" },
        { intent: "Devo creare un sito web per la mia pasticceria", expected: "claude" },
        { intent: "Scrivimi una funzione in Javascript", expected: "claude" },
        { intent: "L'app non si carica, c'è un bug nel frontend", expected: "claude" },
        { intent: "Ho bisogno di un'architettura robusta per il mio db SQL", expected: "claude" },
        { intent: "Costruisci un backend NodeJS", expected: "claude" },
        { intent: "Traduci questo script in python", expected: "claude" },
        { intent: "Puoi sistemare il mio CSS? I div sono disallineati", expected: "claude" },
        { intent: "Aggiungi un componente React", expected: "claude" },
        { intent: "Devo usare git per versionare il progetto", expected: "claude" },
        { intent: "Come funziona la gestione dello state in Java?", expected: "claude" },
        { intent: "Ottimizza il database", expected: "claude" },
        { intent: "Mi serve il backend per la mia nuova app geniale", expected: "claude" },
        { intent: "Analizza questa architettura serverless", expected: "claude" },
        { intent: "Pulisci questo HTML", expected: "claude" },

        // --- 2. Analisi Dati e Logica (Expected: Gemini) ---
        { intent: "Mettimi questi numeri in una tabella", expected: "gemini" },
        { intent: "Devo analizzare i dati finanziari del trimestre", expected: "gemini" },
        { intent: "Struttura questo testo molto lungo e categorizzalo", expected: "gemini" },
        { intent: "Spiegami questo grafico", expected: "gemini" },
        { intent: "Aiutami con questa formula matematica complessa", expected: "gemini" },
        { intent: "Trasforma questo file csv crudo in insight utili", expected: "gemini" },
        { intent: "Fammi una tabella con le statistiche", expected: "gemini" },
        { intent: "Ho un foglio excel pieno di nomi, categorizzali per regione", expected: "gemini" },
        { intent: "Voglio una spiegazione logica al paradosso dei gemelli", expected: "gemini" },
        { intent: "Devo analizzare 10 documenti pdf lunghi", expected: "gemini" },
        { intent: "Estrazione dati strutturati", expected: "gemini" },
        { intent: "Trova il pattern in questa logica", expected: "gemini" },

        // --- 3. Ricerca, Fonti e Mercato (Expected: Perplexity) ---
        { intent: "Trova notizie attuali sul mercato immobiliare", expected: "perplexity" },
        { intent: "Quali sono i trend di ieri nel settore AI?", expected: "perplexity" },
        { intent: "Confrontami questi due competitor", expected: "perplexity" },
        { intent: "Dammi i link e le fonti per dimostrare che l'acqua fa bene", expected: "perplexity" },
        { intent: "Chi è attualmente il presidente di...", expected: "perplexity" },
        { intent: "Trova paper accademici sulla neuroscienza", expected: "perplexity" },
        { intent: "Ricerca i migliori software del momento", expected: "perplexity" },
        { intent: "Fai una ricerca di mercato sui frigoriferi smart", expected: "perplexity" },
        { intent: "Mostrami le citazioni esatte", expected: "perplexity" },
        { intent: "Cosa dicono i trend attuali della finanza", expected: "perplexity" },

        // --- 4. Ripiego Creativo e Testuale (Expected: ChatGPT) ---
        { intent: "Scrivi un post per Linkedin dove dico che cambio lavoro", expected: "chatgpt" },
        { intent: "Riassumimi i Promessi Sposi in breve", expected: "chatgpt" },
        { intent: "Rispondi a questa mail del capo con tono arrabbiato ma formale", expected: "chatgpt" },
        { intent: "Devo fare gli auguri a mia nonna, scrivi una poesia", expected: "chatgpt" },
        { intent: "Dammi un'idea creativa per il nome del mio cane", expected: "chatgpt" },
        { intent: "Traduci questo libretto dall'inglese all'italiano", expected: "chatgpt" },
        { intent: "Cosa posso cucinare stasera con uova e patate?", expected: "chatgpt" },
        { intent: "Fingi di essere Socrate e facciamo conversazione", expected: "chatgpt" },
        { intent: "Correggi gli errori grammaticali qua sotto", expected: "chatgpt" },
        { intent: "Preparami un discorso motivazionale per la squadra", expected: "chatgpt" },
        { intent: "Sintetizza questo capitolo in 3 bullet point", expected: "chatgpt" },
        { intent: "Crea la scaletta per un podcast sul true crime", expected: "chatgpt" },
        { intent: "", expected: "chatgpt" }, // Test campo vuoto
    ];

    testCases.forEach(({ intent, expected }, index) => {
        it(`Test ${index + 1}: Un intento come "${intent || '(vuoto)'}" dovrebbe evocare ${expected}`, () => {
            expect(recommendToolFromIntent(intent)).toBe(expected);
        });
    });

});
