export const getIntelligentSuggestions = (stepId, categories, toolId, data) => {
    // A simple deterministic recommendation engine based on current fields
    const suggestions = {
        gemini: {
            role: ["Sei un analista dati esperto. Usa un tono accademico.", "Sei uno sviluppatore frontend Senior. Pensa come un ingegnere del software.", "Sei un revisore di codice severo."],
            context: ["Ho bisogno di ottimizzare questa architettura per...", "Questo script gira in produzione con questi vincoli di memoria...", "Devo estrarre insight da questa stringa JSON complessa:"],
            task: ["Fai un'analisi dettagliata passo-passo e individua le inefficienze.", "Spiega le vulnerabilità di sicurezza in questo blocco.", "Risolvi il problema indicando pro e contro della soluzione."],
            constraints: ["Spiega la tua ratio analitica prima dell'output finale.", "Nessun framework, usa tecnologie standard e rispondi in puro JSON.", "Sintetizza in massimo 3 paragraphi, usando rigorosamente Markdown headers."]
        },
        chatgpt: {
            action: ["Scrivi una bozza", "Analizza criticamente", "Traduci riga per riga", "Spiega il significato di"],
            topic: ["Questo post virale su LinkedIn", "Questa funzione Python legacy", "Il concetto di Quantum Computing"],
            format: ["In formato Markdown ben leggibile", "Come tabella comparativa", "Lista puntata categorizzata"],
            tone: ["Professionale ma assertivo", "Tecnico, conciso e senza preamboli", "Creativo e umoristico"]
        },
        claude: {
            context: ["Lavoriamo in React. Ecco il log degli errori del backend serverless...", "Questo è il file legacy da rifattorizzare...", "L'utente finale fatica con la UI attuale. Ecco la struttura:"],
            task: ["Converti questo in una pagina web funzionale usando i best-pattern.", "Isola il memory leak e proponi una soluzione scalabile.", "Estrai le entità rilevanti ed effetta un mapping strutturato."],
            rules: ["Rispondi rigorosamente e unicamente in formato JSON valido.", "Non aggiungere alcuna spiegazione conversazionale esterna all'XML.", "Attieniti unicamente al contesto. Se mancano dati, fallisc silentemente."]
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
