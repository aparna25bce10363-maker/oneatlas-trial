type EventType = {

  type: string

  stage: string

  timestamp: number

  data?: any

}

const store:
Record<string, EventType[]> = {}

export function addEvent(

  jobId: string,

  event: EventType

) {

  if (!store[jobId]) {

    store[jobId] = []

  }

  store[jobId].push(event)

}

export function getEvents(

  jobId: string

) {

  return store[jobId] || []

}