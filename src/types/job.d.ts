
export type ExtractedJobEvent = {
  isJobRelated: boolean
  company: string | null
  position: string | null
  status: 'applied' | 'interview' | 'rejected' | 'offer' | 'unknown'|'withdrawn'
  date: string | null 
  confidence: number 
}