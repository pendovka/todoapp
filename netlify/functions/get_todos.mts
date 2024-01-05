import type { Context } from "@netlify/functions"

export const handler = async (req: Request, context: Context) => {
  return {statusCode : 200, body : JSON.stringify(['asga', 'asfasf'])}
}

