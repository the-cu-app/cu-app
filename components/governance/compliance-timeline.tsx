"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react"

interface TimelineEvent {
  id: string
  title: string
  status: "passed" | "warning" | "failed" | "pending"
  timestamp: string
  description: string
}

interface ComplianceTimelineProps {
  events: TimelineEvent[]
}

export function ComplianceTimeline({ events }: ComplianceTimelineProps) {
  const getStatusIcon = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "failed":
        return <XCircle className="w-5 h-5 text-destructive" />
      case "pending":
        return <Clock className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center">
              {getStatusIcon(event.status)}
            </div>
            {index < events.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
          </div>
          <Card className="flex-1 p-4 mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{event.title}</h3>
              <span className="text-xs text-muted-foreground">{event.timestamp}</span>
            </div>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </Card>
        </div>
      ))}
    </div>
  )
}
