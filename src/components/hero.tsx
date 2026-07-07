"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Hero() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setTranscript(event.target?.result as string);
    };

    reader.readAsText(file);
  };


  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      alert("Please enter a meeting transcript.");
      return;
    }

    try {
      setLoading(true);
      setResult("");
      setError("");

      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript,
        }),
      });


      const data = await response.json();

      console.log("API RESPONSE:", data);


      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }


      setResult(data.result);

const { error } = await supabase
  .from("meeting_history")
  .insert({
    transcript,
    result: data.result,
  });

if (error) {
  console.error("Supabase error:", error);
}


    } catch (err) {
      console.error(err);
      setError("Failed to analyze meeting.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      </div>


      <div className="mx-auto max-w-6xl px-6 py-20 text-center">


        <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          ✨ Powered by Gemini AI
        </span>


        <h1 className="mt-8 text-6xl font-extrabold">
          AI Meeting
          <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Summarizer
          </span>
        </h1>


        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Convert long meeting transcripts into summaries,
          decisions, action items and insights.
        </p>



        <div className="mx-auto mt-14 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">


          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting transcript here..."
            className="h-72 w-full resize-none rounded-2xl border border-slate-700 bg-slate-900/80 p-5 text-white outline-none focus:border-cyan-400"
          />



          <input
            type="file"
            accept=".txt"
            id="fileUpload"
            className="hidden"
            onChange={handleFileUpload}
          />



          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">


            <label
              htmlFor="fileUpload"
              className="cursor-pointer rounded-xl border border-cyan-500 px-6 py-3 font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-white"
            >
              📄 Upload .txt
            </label>



            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold text-white disabled:opacity-50"
            >

              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Analyzing...
                </span>
              ) : (
                "🚀 Analyze Meeting"
              )}

            </button>


          </div>



          {error && (
            <div className="mt-6 rounded-xl bg-red-500/20 p-4 text-red-300">
              {error}
            </div>
          )}



          {result && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-left">

              <h2 className="mb-4 text-2xl font-bold text-cyan-400">
                AI Summary
              </h2>

              {result && (
  <div className="mt-10 space-y-6 text-left">

    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <h2 className="text-xl font-bold text-cyan-400">
        📌 Executive Summary
      </h2>
      <p className="mt-3 text-slate-200">
        {result.summary}
      </p>
    </div>


    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <h2 className="text-xl font-bold text-blue-400">
        ✅ Key Decisions
      </h2>

      <ul className="mt-3 list-disc pl-5 text-slate-200">
        {result.decisions.map((item:string, index:number)=>(
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>


    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
      <h2 className="text-xl font-bold text-purple-400">
        📝 Action Items
      </h2>

      {result.actionItems.map((item:any,index:number)=>(
        <div key={index} className="mt-3 rounded-xl bg-white/5 p-4">
          <p className="text-white">
            {item.task}
          </p>

          <p className="text-sm text-slate-400">
            Owner: {item.owner}
          </p>
        </div>
      ))}
    </div>


    <div className="grid gap-4 sm:grid-cols-2">

      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
        <p className="text-slate-400">
          Sentiment
        </p>
        <p className="mt-2 text-lg font-bold text-green-400">
          {result.sentiment}
        </p>
      </div>


      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
        <p className="text-slate-400">
          Topics
        </p>
        <p className="mt-2 text-white">
          {result.topics.join(", ")}
        </p>
      </div>

    </div>

  </div>
)}

            </div>
          )}


        </div>


      </div>


    </section>
  );
}