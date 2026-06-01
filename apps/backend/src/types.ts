export interface GenerateRequest {
  prompt: string
}

export interface Job {
  id: string
  status: "queued" | "processing" | "completed" | "failed"
  prompt: string
  createdAt: string
}

export interface StreamMessage {
  type:
    | "log"
    | "step"
    | "final_result"
    | "error"

  data?: any

  message?: string

  step?: string
}

export interface FinalResult {
  architecture?: any
  databaseSchema?: any
  frontend?: any
  backend?: any
  deployment?: any
}