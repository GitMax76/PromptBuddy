# 🪄 Prompt Buddy 

> **Il tuo Traduttore Universale per l'AI / Your Universal AI Translator**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

[🇮🇹 Italiano](#italiano) | [🇬🇧 English](#english)

---

## 🇮🇹 Italiano

### 🌟 Cos'è Prompt Buddy?
**Prompt Buddy** è una Web App open-source progettata per aiutarti a scrivere i prompt perfetti per le Intelligenze Artificiali. 
Spesso abbiamo un'idea chiara in testa ("Crea un sito web", "Riassumi questo testo"), ma i LLM necessitano di direttive tecniche molto specifiche per non "allucinare" e fornire il risultato ottimale. 

Prompt Buddy risolve il problema della pagina bianca: 
1. **Tu scrivi l'idea grezza.**
2. **L'app suggerisce il modello migliore** per il tuo obiettivo.
3. **Ti guida passo-passo** chiedendo i dettagli giusti per formulare un prompt impeccabile.
4. *(Opzionale)* **L'Intelligenza Artificiale riscrive il tuo prompt:** fornendo una chiave API gratuita, la web app trasforma magicamente la tua idea confusionale in un prompt ingegneristico perfetto.

### 🙏 Crediti e Repository Originale
Le regole logiche pre-impostate su come strutturare i prompt per i vari modelli (come ad esempio i tag XML per Claude, o la formattazione chain-of-thought per Gemini) sono state estratte dalla formidabile raccolta open-source:
👉 **[x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)**. 

### 💻 Come Avviare il Progetto (Locale)
```bash
# Installa le dipendenze
npm install

# Avvia l'app in locale
npm run dev
```
*(Nota sulla Privacy: Se utilizzi l'Auto-Enhancer, la tua chiave API Google Gemini viene salvata localmente nel tuo browser. Nessun dato viene trasmesso a server di terze parti.)*

---

## 🇬🇧 English

### 🌟 What is Prompt Buddy?
**Prompt Buddy** is an open-source web app designed to help you write the perfect prompts for Artificial Intelligences. 
We often have a clear idea in mind ("Build a website", "Summarize this text"), but LLMs require highly specific technical directives to avoid "hallucinations" and deliver optimal results.

Prompt Buddy cures the blank-page syndrome:
1. **You jot down your raw idea.**
2. **The app recommends the best model** for your specific goal.
3. **It guides you step-by-step**, asking exactly what details are needed to formulate a flawless prompt.
4. *(Optional)* **AI auto-rewrite:** by providing a free API key, the web app magically expands your messy idea into a perfect, engineering-grade system prompt.

### 🙏 Credits and Original Repository
The predefined logical rules on how to properly structure prompts for the various models (such as XML tags for Claude, or chain-of-thought formatting for Gemini) were extracted and distilled from this incredible open-source collection:
👉 **[x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)**. 

### 💻 How to Run Locally
```bash
# Install dependencies
npm install

# Start the local environment
npm run dev
```
*(Privacy Note: If you use the Auto-Enhancer feature, your Google Gemini API key is stored safely and exclusively in your local browser's LocalStorage. No data is sent to third-party servers.)*
