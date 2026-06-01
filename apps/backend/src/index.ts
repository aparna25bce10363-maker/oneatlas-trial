import dotenv from "dotenv"

dotenv.config()
import express from "express"

import cors from "cors"

import { randomUUID }
from "crypto"

import {
  createJob,
  getJob
}
from "./jobs/jobStore"

import { processJob }
from "./jobs/processJob"



const app = express()

app.use(cors())

app.use(express.json())

/**
 * HEALTH CHECK
 */

app.get(

  "/health",

  (_, res) => {

    res.json({

      success: true,

      message:
        "Backend running successfully"

    })

  }

)

/**
 * GENERATE APP
 */

app.post(

  "/generate",

  async (req, res) => {

    try {

      const { prompt } =
        req.body

      if (!prompt) {

        return res.status(400)
          .json({

            success: false,

            error:
              "Prompt is required"

          })

      }

      const jobId =
        randomUUID()

      createJob(jobId)

      processJob(

        jobId,

        prompt

      )

      return res.json({

        success: true,

        jobId

      })

    } catch (error) {

      console.error(error)

      return res.status(500)
        .json({

          success: false,

          error:
            "Failed to start generation"

        })

    }

  }

)

/**
 * STREAM EVENTS
 */

app.get(

  "/stream/:jobId",

  (req, res) => {

    const { jobId } =
      req.params

    res.setHeader(

      "Content-Type",

      "text/event-stream"

    )

    res.setHeader(

      "Cache-Control",

      "no-cache"

    )

    res.setHeader(

      "Connection",

      "keep-alive"

    )

    const interval =
      setInterval(() => {

        const job =
          getJob(jobId)

        if (!job) {

          res.write(

            `data: ${JSON.stringify({

              type: "error",

              message:
                "Job not found"

            })}\n\n`

          )

          return

        }

        while (
          job.events.length > 0
        ) {

          const event =
            job.events.shift()

          res.write(

            `data: ${JSON.stringify(
              event
            )}\n\n`

          )

        }

      }, 1000)

    req.on("close", () => {

      clearInterval(interval)

    })

  }

)

const PORT =
  process.env.PORT || 4000

app.listen(PORT, () => {

  console.log(

    `🚀 Server running on port ${PORT}`

  )

})