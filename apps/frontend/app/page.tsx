"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function HomePage() {

  const [prompt, setPrompt] =
    useState("")

  const [logs, setLogs] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(false)

  const generateApp = async () => {

    try {

      setLoading(true)
      setLogs([])

      const response =
        await fetch(
          "https://oneatlas-trial-1.onrender.com/generate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              prompt
            })
          }
        )

const result =
  await response.json()

alert(JSON.stringify(result, null, 2))

const jobId =
  result.jobId

      const eventSource =
        new EventSource(
          `https://oneatlas-trial-1.onrender.com/stream/${jobId}`
        )

eventSource.onmessage = (event) => {

  console.log("SSE:", event.data)

  const data =
    JSON.parse(event.data)

  setLogs((prev) => [
    ...prev,
    data
  ])

}

      eventSource.onerror =
        () => {

          eventSource.close()

          setLoading(false)

        }

    } catch (error) {

      console.error(error)

      setLoading(false)

    }

  }

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        p-8
      "
    >

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.8
        }}

        className="
          w-full
          max-w-6xl
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-8
          shadow-2xl
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-8
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-bold
                mb-2
              "
            >
              OneAtlas
            </h1>

            <p
              className="
                text-white/60
                text-lg
              "
            >
              AI Application Generator
            </p>

          </div>

          <div
            className="
              px-4
              py-2
              rounded-full
              bg-green-500/20
              text-green-400
              text-sm
            "
          >
            AI ACTIVE
          </div>

        </div>

        <div
          className="
            space-y-4
          "
        >

          <textarea

            value={prompt}

            onChange={(e) =>
              setPrompt(e.target.value)
            }

            placeholder="
Describe the app you want to generate...
"

            className="
              w-full
              h-40
              rounded-2xl
              bg-black/40
              border
              border-white/10
              p-6
              text-lg
              outline-none
              resize-none
            "
          />

          <button

            onClick={generateApp}

            className="
              w-full
              py-4
              rounded-2xl
              bg-white
              text-black
              font-semibold
              text-lg
              hover:scale-[1.01]
              transition
            "
          >

            {
              loading
                ? "Generating..."
                : "Generate Application"
            }

          </button>

        </div>

        <div
          className="
            mt-10
            grid
            grid-cols-3
            gap-4
          "
        >

          <div
            className="
              rounded-2xl
              border
              border-white/10
              p-4
              bg-white/5
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                mb-2
              "
            >
              Intent
            </h2>

            <p
              className="
                text-white/60
              "
            >
              AI extracts business goals
              and app requirements.
            </p>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/10
              p-4
              bg-white/5
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                mb-2
              "
            >
              Schema
            </h2>

            <p
              className="
                text-white/60
              "
            >
              Database models generated
              automatically.
            </p>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/10
              p-4
              bg-white/5
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                mb-2
              "
            >
              App Spec
            </h2>

            <p
              className="
                text-white/60
              "
            >
              APIs, workflows and pages
              generated in realtime.
            </p>

          </div>

        </div>

        <div
          className="
            mt-10
            rounded-2xl
            border
            border-white/10
            bg-black/30
            p-6
            h-96
            overflow-y-auto
          "
        >

          <h2
            className="
              text-2xl
              font-semibold
              mb-4
            "
          >
            Live AI Logs
          </h2>

          <div
            className="
              space-y-3
              text-sm
              font-mono
            "
          >

            {
              logs.map(
                (log, index) => (

                  <div
                    key={index}

                    className="
                      border
                      border-white/10
                      rounded-xl
                      p-3
                      bg-white/5
                    "
                  >

                    <p
                      className="
                        text-green-400
                        mb-2
                      "
                    >
                      {log.type}
                    </p>

                    <pre
                      className="
                        text-white/70
                        whitespace-pre-wrap
                      "
                    >
                      {
                        JSON.stringify(
                          log,
                          null,
                          2
                        )
                      }
                    </pre>

                  </div>

                )
              )
            }

            {
              loading && (

                <p
                  className="
                    text-yellow-400
                  "
                >
                  AI is generating...
                </p>

              )
            }

          </div>

        </div>

      </motion.div>

    </main>

  )

}