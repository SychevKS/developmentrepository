export interface Topic {
  id: string
  name: string
  direction: string
  textPath: string
}

export type TopicData = {
  topics: Topic[]
}
