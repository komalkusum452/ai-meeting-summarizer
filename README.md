# 🤖 AI Meeting Summarizer

An AI-powered meeting intelligence platform that transforms lengthy meeting transcripts into structured, actionable insights using **Google Gemini AI**.

The application helps users quickly understand meetings by generating concise summaries, extracting key decisions, identifying action items, analyzing sentiment, and organizing important discussion topics.

## ✨ Features

### 📝 Intelligent Meeting Analysis

* Accepts meeting transcripts through:

  * Direct text input
  * `.txt` file upload
* Uses Gemini AI to analyze conversations and extract meaningful insights.

### 📌 AI Generated Summary

Automatically creates an executive summary containing:

* Main discussion points
* Important highlights
* Overall meeting context

### ✅ Decision Extraction

Identifies important decisions made during the meeting so users can quickly review outcomes.

### 📝 Action Item Detection

Extracts tasks from conversations with:

* Task description
* Assigned owner
* Deadline (when available)

### 😊 Sentiment Analysis

Analyzes the overall tone of the meeting:

* Positive
* Neutral
* Tense

### 🔥 Topic Identification

Detects major topics discussed during the meeting.

### 💾 Meeting History

* Stores previous AI analyses using Supabase
* Allows users to revisit generated summaries later
* Maintains transcript and structured AI output

---

## 🏗️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Google Gemini API

### Database

* Supabase PostgreSQL

### Development Tools

* VS Code
* Git & GitHub

---

## ⚙️ How It Works

```
User uploads/pastes transcript
              |
              ↓
      Next.js Frontend
              |
              ↓
    API Route (/api/summarize)
              |
              ↓
        Gemini AI Model
              |
              ↓
 Structured meeting analysis
              |
              ↓
      Supabase Database
              |
              ↓
       Meeting History
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-meeting-summarizer.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
src
├── app
│   ├── api
│   │   └── summarize
│   │       └── route.ts
│   │
│   ├── history
│   │   └── page.tsx
│   │
│   └── page.tsx
│
├── components
│   └── Hero.tsx
│
└── lib
    └── supabase.ts
```


Built with:

* Next.js
* Gemini AI
* Supabase
* Tailwind CSS

---

## ⭐ Why This Project?

Traditional meeting notes require manual effort and often miss important details.

This project demonstrates how Generative AI can be integrated into a full-stack application to automate information extraction, improve productivity, and create a smarter meeting workflow.
