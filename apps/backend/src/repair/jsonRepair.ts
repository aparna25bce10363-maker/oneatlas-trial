export function repairJSON(

  raw: string

): string {

  let repaired = raw.trim()

  // remove markdown blocks
  repaired = repaired.replace(/```json/g, "")
  repaired = repaired.replace(/```/g, "")

  // remove trailing commas
  repaired = repaired.replace(/,\s*}/g, "}")
  repaired = repaired.replace(/,\s*]/g, "]")

  return repaired

}