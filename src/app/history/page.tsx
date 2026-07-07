import { supabase } from "../../lib/supabase";

export default async function HistoryPage() {

  const { data: meetings, error } = await supabase
    .from("meeting_history")
    .select("*")
    .order("created_at", { ascending: false });


  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-red-400">
        Failed to load history
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">


      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-extrabold text-cyan-400">
          Meeting History
        </h1>

        <p className="mt-2 text-slate-400">
          Previous AI generated meeting summaries
        </p>



        {meetings && meetings.length > 0 ? (

          <div className="mt-10 space-y-8">


            {meetings.map((meeting) => (

              <div
                key={meeting.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >


                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-bold text-cyan-300">
                    📋 Meeting Summary
                  </h2>

                  <p className="text-sm text-slate-500">
                    {new Date(
                      meeting.created_at
                    ).toLocaleString()}
                  </p>

                </div>



                {/* Summary */}

                <div className="mt-6">

                  <h3 className="text-lg font-semibold text-white">
                    📌 Executive Summary
                  </h3>

                  <p className="mt-2 text-slate-300">
                    {meeting.result.summary}
                  </p>

                </div>




                {/* Decisions */}

                <div className="mt-6">

                  <h3 className="text-lg font-semibold text-white">
                    ✅ Key Decisions
                  </h3>


                  <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-300">

                    {meeting.result.decisions?.map(
                      (decision:string, index:number) => (
                        <li key={index}>
                          {decision}
                        </li>
                      )
                    )}

                  </ul>

                </div>





                {/* Action Items */}

                <div className="mt-6">

                  <h3 className="text-lg font-semibold text-white">
                    📝 Action Items
                  </h3>


                  <div className="mt-3 space-y-3">

                    {meeting.result.actionItems?.map(
                      (item:any, index:number) => (

                        <div
                          key={index}
                          className="rounded-xl bg-white/5 p-4"
                        >

                          <p className="font-medium text-white">
                            {item.task}
                          </p>


                          <p className="mt-1 text-sm text-slate-400">
                            Owner: {item.owner}
                          </p>


                        </div>

                      )
                    )}

                  </div>

                </div>





                {/* Bottom Stats */}

                <div className="mt-6 grid gap-4 md:grid-cols-2">


                  <div className="rounded-xl bg-white/5 p-4">

                    <h3 className="text-sm text-slate-400">
                      Sentiment
                    </h3>

                    <p className="mt-2 font-semibold text-green-400">
                      {meeting.result.sentiment}
                    </p>

                  </div>




                  <div className="rounded-xl bg-white/5 p-4">

                    <h3 className="text-sm text-slate-400">
                      Topics
                    </h3>

                    <p className="mt-2 text-slate-200">
                      {meeting.result.topics?.join(", ")}
                    </p>

                  </div>


                </div>



              </div>

            ))}


          </div>


        ) : (

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">

            No meeting history found.

          </div>

        )}



      </div>


    </main>
  );
}