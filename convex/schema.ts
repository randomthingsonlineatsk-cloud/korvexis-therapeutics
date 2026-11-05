import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    organization: v.optional(v.string()),
    topic: v.union(v.literal("Media inquiry"), v.literal("Investor inquiry"), v.literal("Careers"), v.literal("General")),
    message: v.string(),
    handled: v.optional(v.boolean()),
  }),
  papers: defineTable({
    pmid: v.string(),
    title: v.string(),
    authors: v.array(v.string()),
    journal: v.string(),
    pubDate: v.string(),
    url: v.string(),
    queryTopic: v.string(),
  }).index("by_pmid", ["pmid"]),
  newsletterSubscribers: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
})
