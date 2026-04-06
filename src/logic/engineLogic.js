export const getIntelligentSuggestions = (stepId, categories, toolId, data) => {
    // A simple deterministic recommendation engine based on current fields
    const suggestions = {
        gemini: {
            role: ["Sei un analista dati esperto", "Sei uno sviluppatore frontend Senior", "Sei un copywriter creativo"],
            context: ["Ho bisogno di ottimizzare questa funzione per...", "Stiamo lanciando un nuovo prodotto e...", "Devo comprendere questo documento complesso:"],
            task: ["Fai un'analisi dettagliata passo-passo", "Restituisci un piano strutturato in capitoli", "Risolvi il seguente problema logico:"],
            constraints: ["Spiega il tuo ragionamento prima dell'output", "Nessun framework, usa tecnologie standard", "Sintetizza in massimo 3 paragrafi"]
        },
        chatgpt: {
            action: ["Scrivi", "Analizza", "Traduci", "Spiega"],
            topic: ["Un post per LinkedIn sul remote work", "Questa funzione Python", "Il concetto di Quantum Computing"],
            format: ["In formato Markdown ben leggibile", "Come tabella comparativa", "Lista puntata"],
            tone: ["Professionale ma empatico", "Tecnico e conciso", "Umoristico"]
        },
        claude: {
            context: ["Siamo in un progetto React e...", "Questo è il log di un errore del server...", "Ecco il testo grezzo da cui partire:"],
            task: ["Converti questo in una pagina web funzionale", "Trova la causa del memory leak", "Estrai le entità rilevanti e raggruppale"],
            rules: ["Rispondi rigorosamente in formato JSON valida", "Non aggiungere spiegazioni, stampa solo le parti richieste", "Attieniti unicamente alle informazioni fornite nel contesto"]
        },
        perplexity: {
            query: ["Quali sono i trend di mercato per...", "Chi sono i competitor diretti di...", "Quali articoli scientifici recenti parlano di..."],
            focus: ["Filtra solo fonti degli ultimi 2 anni", "Preferisci paper accademici e siti governativi", "Escludi blog post e opinioni"],
            synthesis: ["Costruisci un report con fonti numerate", "Crea una tabella di pro/contro", "Elenca 5 bullet point essenziali"]
        },
        cursor: {
            file: ["src/App.jsx", "index.css", "package.json", "components/Button.tsx"],
            issue: ["Aggiungi un handler per onSubmit", "Fissa il bug di overflow orizzontale su mobile", "Aggiorna la dipendenza e deduplica"],
            style: ["Usa Typescript strict", "Segui pattern BEM per CSS", "Early return per error handling"]
        }
    };

    // Fallback generici se non si trova il tool specifico
    const fallback = ["Cerca di essere più specifico...", "Aggiungi dettagli di business", "Qual è la priorità?"];
    
    if (suggestions[toolId] && suggestions[toolId][stepId]) {
        return suggestions[toolId][stepId];
    }
    
    return fallback;
};
