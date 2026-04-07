import { NLP } from '../logic/nlpEngine';

export const toolsDatabase = [
    {
        id: "gemini",
        name: "Google Gemini",
        categories: ["testo", "codice", "creativo", "ricerca"],
        tags: ["ragionamento", "multimodale", "strutturato"],
        description: "Ideale per contesti ampi e processamento logico.",
        systemInfo: "Gemini performa al meglio quando le istruzioni sono divise in sezioni chiare con header markdown e quando gli si chiede esplicitamente di 'spiegare il ragionamento' step by step.",
        guideSteps: [
            { 
                id: "role", 
                label: "Identità / Ruolo", 
                guide: "Fai interpretare a Gemini una parte specifica.", 
                helpText: "Evita ruoli generici. Sii specifico: 'Sei un copywriter esperto di B2B', oppure 'Sei un Senior Python Data Scientist'. Più dettagli dai sul suo background, più calibrerà bene la risposta.",
                placeholder: "Es: Sei uno stratega di marketing specializzato in startup SaaS..." 
            },
            { 
                id: "context", 
                label: "Il Contesto (Il quadro generale)", 
                guide: "Non dare nulla per scontato.", 
                helpText: "Rispondi a queste domande:\n- Qual è la situazione attuale?\n- Qual è il problema che vuoi risolvere?\n- Chi è il pubblico / target di riferimento?\n- Quali tentativi hai già fatto?",
                placeholder: "Es: Stiamo lanciando una nuova app per il fitness dedicata agli over 50. Finora abbiamo fatto post su FB ma senza risultati. Il nostro budget è ristretto..." 
            },
            { 
                id: "task", 
                label: "Obiettivo Principale", 
                guide: "Il compito esatto e isolato che deve compiere.", 
                helpText: "L'errore più comune è chiedere 10 cose insieme. Cerca di definire l'azione principale. Inizia col verbo: 'Scrivi', 'Analizza', 'Progetta', 'Correggi'.",
                placeholder: "Es: Scrivi un piano editoriale di 4 settimane focalizzato sui benefici per la salute delle articolazioni." 
            },
            { 
                id: "constraints", 
                label: "Vincoli (Cosa NON fare)", 
                guide: "Recinta il campo d'azione dell'AI.", 
                helpText: "Spiega cosa evitare. I LLM tendono ad allungare il brodo. Vuoi una risposta breve? Vuoi evitare termini tecnici? Vuoi una tabella?",
                placeholder: "Es: Massimo 100 parole a post. Usa un tono rassicurante, spezza le frasi, niente gergo medico complesso." 
            }
        ],
        generatePrompt: (data) => {
            let prompt = "Sei un esperto. Ho bisogno di un output strutturato esattamente come specificato di seguito. Usa header Markdown chiari e testo in grassetto per la formattazione.\n\n";
            if (data.role) prompt += `**RUNTIME/RUOLO**\nAgisci come: ${NLP.process(data.role)}\n\n`;
            if (data.context) prompt += `**PANORAMICA E CONTESTO**\n${NLP.process(data.context)}\n\n`;
            if (data.task) prompt += `**STRUTTURA OBIETTIVO ESECUTIVO**\n${NLP.process(data.task)}\n\n`;
            if (data.constraints) prompt += `**REGOLE RIGOROSE E VINCOLI**\n${NLP.process(data.constraints)}\n\n`;
            prompt += `**PROCEDURA DI ESECUZIONE**\nSpiega il tuo ragionamento logico prima di fornire la soluzione finale.`;
            return prompt.trim();
        }
    },
    {
        id: "chatgpt",
        name: "ChatGPT (OpenAI)",
        categories: ["testo", "creativo", "codice"],
        tags: ["dialogo", "versatile", "strutturato"],
        description: "Versatile e diretto, eccelle con istruzioni imperative esplicite.",
        systemInfo: "ChatGPT risponde eccezionalmente bene alle direttive imperiative ('Fai questo, Poi fai questo') e ha bisogno di sapere 'come' ti aspetti l'output.",
        guideSteps: [
            { 
                id: "action", 
                label: "La Mansione", 
                guide: "Definisci la catena di azioni.", 
                helpText: "Usa istruzioni attive e sequenziali. 'Leggi il testo, poi estrai i nomi, infine crea una lista'.",
                placeholder: "Es: Leggi questi appunti confusi, riorganizzali seguendo un filo logico e crea un riassunto esaustivo." 
            },
            { 
                id: "topic", 
                label: "Materiale di Base", 
                guide: "Incolla qui i dati su cui deve lavorare.", 
                helpText: "Se devi fornirgli dei testi, articoli, o codici grezzi da cui partire, inseriscili qui. ChatGPT è ottimo per manipolare e riorganizzare i darti.",
                placeholder: "Es: [Incolla qui il tuo testo, gli appunti della riunione o l'estratto del codice...]" 
            },
            { id: "format", label: "Formato e Struttura", guide: "Imponi il formato.", helpText: "Descrivi visualmente l'output. Vuoi un JSON? Vuoi l'elenco puntato col trattino invece del punto? Diglielo.", placeholder: "Es: Voglio una tabella con due colonne (Pro e Contro). Niente premesse conversazionali all'inizio." },
            { id: "tone", label: "Tono di Voce", guide: "Personalità dell'output.", helpText: "Un tono 'professionale' risulta spesso legnoso. Prova: 'Scrivi in prima persona, come se parlassi a un amico in metropolitana, tono empatico ma conciso'.", placeholder: "Es: Stile colloquiale ma formale accademico, prima persona singolare." }
        ],
        generatePrompt: (data) => {
            let prompt = "Agisci come un esperto del settore e segui fedelmente queste istruzioni:\n\n";
            if (data.action && data.topic) prompt += `### Istruzione Principale\n${NLP.process(data.action)}\n\n### Dati/Argomento\n${NLP.process(data.topic)}\n\n`;
            else if (data.topic) prompt += `### Argomento\n${NLP.process(data.topic)}\n\n`;
            
            if (data.format) prompt += `### Formato Richiesto\n${NLP.process(data.format)}\n\n`;
            if (data.tone) prompt += `### Tono di Voce\n${NLP.process(data.tone)}\n\n`;
            return prompt.trim();
        }
    },
    {
        id: "claude",
        name: "Anthropic Claude",
        categories: ["testo", "codice", "ricerca"],
        tags: ["xml", "analitico", "dettagliato"],
        description: "Modello sofisticato: richiede strutture XML per separare context e rules.",
        systemInfo: "I system prompts di Claude evidenziano un forte bias verso le architetture XML isolate. Non mischiare istruzioni e dati: usa i blocchi.",
        guideSteps: [
            { id: "context", label: "Contesto (XML <context>)", guide: "Background informativo per Claude.", helpText: "Racconta qui tutto il passato del problema. L'ambiente, i prerequisiti mondiali o di dominio. Più sei specifico e pignolo sul contesto di fondo (il 'Perché'), meglio si orienta l'intelligenza analitica di Claude.", placeholder: "Es: Lavoriamo su un'interfaccia utente in React. L'azienda vuole implementare un tema scuro ma mantenendo alti i contrasti per l'accessibilità..." },
            { id: "task", label: "Obiettivo (XML <task>)", guide: "La mansione precisa e chirurgica.", helpText: "A differenza del contesto, qui descrivi solo l'esecuzione meccanica o logica pretesa. Separa i sotto-task se necessario.", placeholder: "Es: Analizza i colori attuali, genera 3 varianti di palette scura in esadecimale e scrivi il CSS conseguente." },
            { id: "rules", label: "Regole rigorose (XML <rules>)", guide: "Le leggi inalienabili.", helpText: "Usa negazioni forti o imperativi assoluti. Claude ubbidisce meticolosamente a questa sezione. 'YOU MUST...', 'NON DEVI MAI...'", placeholder: "Es: NON usare framework CSS. Devi usare solo Vanilla CSS. Non stampare chiacchiere in output, solo codice copiabile." }
        ],
        generatePrompt: (data) => {
            let prompt = "Segui rigorosamente queste istruzioni basate sulla struttura XML fornita. L'obiettivo è generare un output di eccellenza e senza compromessi:\n\n";
            if (data.context) prompt += `<context>\n${NLP.process(data.context)}\n</context>\n\n`;
            if (data.task) prompt += `<task>\n${NLP.process(data.task)}\n</task>\n\n`;
            if (data.rules) prompt += `<rules>\n${NLP.process(data.rules)}\n</rules>\n\n`;
            prompt += `Per prevenire allucinazioni e garantire una totale coerenza logica, DEVI prima strutturare il tuo ragionamento analitico all'interno dei tag <thinking></thinking> prima di erogare la soluzione finale. Rispetta rigorosamente i blocchi XML.`;
            return prompt.trim();
        }
    },
    {
        id: "perplexity",
        name: "Perplexity",
        categories: ["ricerca", "testo"],
        tags: ["web-search", "citazioni", "sintesi"],
        description: "Motore di ricerca AI. Reagisce alle parole chiave informative e fonti.",
        systemInfo: "Essendo una search-first AI, il prompt ideale è una richiesta accademica limitata nel tempo o per fonte.",
        guideSteps: [
            { id: "query", label: "Domanda di Ricerca", guide: "L'investigazione principale.", helpText: "Evita query generiche 'Cos è il bitcoin'. Usa query comparative 'Confronta il protocollo di X con Y per quanto riguarda...', oppure temporali 'Trend di... negli ultimi 6 mesi'.", placeholder: "Es: Quali sono i migliori framework CSS del 2024 per le performance, basati su benchmark recenti?" },
            { id: "focus", label: "Fonti e Limitazioni", guide: "Delimita l'orizzonte (BETA).", helpText: "Limita le 'allucinazioni web' restringendo le fonti ('Solo papers', 'Escludi forum', 'Cerca solo su sito.com').", placeholder: "Es: Usa solo fonti accademiche, documentazioni ufficiali ed escludi blog di opinione come Medium." },
            { id: "synthesis", label: "Struttura Sintesi finale", guide: "Come leggere il resoconto.", helpText: "Specifica come vuoi agglomerare i trofei di ricerca (Tabelle, sommario per punti, analisi SWAT).", placeholder: "Es: Mostra i pro e contro in una tabella Markdown e aggiungi all'ultimo un riassunto direzionale." }
        ],
        generatePrompt: (data) => {
            let prompt = "";
            if (data.query) prompt += `**Soggetto di Ricerca:** ${NLP.process(data.query)}\n\n`;
            if (data.focus) prompt += `**Limiti e vincoli orizzonte (Fonti):** ${NLP.process(data.focus)}\n\n`;
            if (data.synthesis) prompt += `**Formato e delivery Risposta:** ${NLP.process(data.synthesis)}\nAssicurati di citare sempre rigorosamente le fonti per ogni singola affermazione (inline citations).`;
            return prompt.trim();
        }
    },
    {
        id: "cursor",
        name: "Cursor App",
        categories: ["codice"],
        tags: ["ide", "inline-editing", "snippet"],
        description: "Ingegneria pura. Fix diretti, snippet limitati per context-window.",
        systemInfo: "Nel coding puro, la prolissità uccide la qualità. Bisogna indicare file di partenza, il bug esatto, ed evincere gli style pattern.",
        guideSteps: [
            { id: "file", label: "File e Path Coinvolti", guide: "Meno file indichi, meno l'AI allucina.", helpText: "Sii preciso sul perimetro dell'intervento. Questo aiuta il motore vettoriale interno a non pescare dal resto dell'appcose non necessarie.", placeholder: "Es: src/components/Button.jsx e src/index.css" },
            { id: "issue", label: "L'Action / Il Bug", guide: "Il problema meccanico o logico.", helpText: "Rispondi: 'Cosa succede vs Cosa dovrebbe succedere' (per i bug), oppure 'Quale logica implementare' (per le features).", placeholder: "Es: Il bottone non si adatta graficamente su mobile, l'overflow sull'asse X rompe il layout. Riorganizza i grid." },
            { id: "style", label: "Linting / Architettura", guide: "Spiega il design pattern a cui adattarsi.", helpText: "Questa è la regola d'oro dei prompt da programmatori. Indica di rispettare: typing (Typescript), convenzioni nomini (camelCase), o architetture (Saga, Redux, ecc).", placeholder: "Es: Usa arrow functions. Nessuna variabile var, solo const/let. Mantieni i componenti React pure senza effetti se non necessari." }
        ],
        generatePrompt: (data) => {
            let prompt = "";
            if (data.file) prompt += `Files in scope: \`${data.file.trim()}\`\n\n`;
            if (data.issue) prompt += `Action/Instruction: ${data.issue.trim()}\n\n`;
            if (data.style) prompt += `Architecture Rules: ${data.style.trim()}\n\n`;
            prompt += `Provide only the necessary code changes. Do not include excessive conversational text, preamble, or epilogue. Provide diff-ready or copy-able clean snippets.`;
            return prompt.trim();
        }
    }
];
