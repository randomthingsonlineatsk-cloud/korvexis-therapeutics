import { cronJobs } from "convex/server"
import { internal } from "./_generated/api"

const crons = cronJobs()
crons.daily("refresh PubMed research feed", { hourUTC: 3, minuteUTC: 30 }, internal.research.refresh, {})
export default crons
