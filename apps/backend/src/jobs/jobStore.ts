export const jobs:
  Record<string, any> = {}

/**
 * Create New Job
 */
export function createJob(
  jobId: string
) {

  jobs[jobId] = {

    id: jobId,

    status: "pending",

    events: []

  }

}

/**
 * Update Existing Job
 */
export function updateJob(

  jobId: string,

  data: any

) {

  if (!jobs[jobId]) {
    return
  }

  jobs[jobId] = {

    ...jobs[jobId],

    ...data

  }

}

/**
 * Get Job
 */
export function getJob(
  jobId: string
) {

  return jobs[jobId]

}