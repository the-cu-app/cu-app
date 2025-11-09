"use client"

import { Card } from "@/components/ui/card"
import { Type, Square, ImageIcon, List, CheckSquare, Calendar, DollarSign } from "lucide-react"

interface ComponentPaletteProps {
  onSelectComponent: (type: string) => void
}

export function ComponentPalette({ onSelectComponent }: ComponentPaletteProps) {
  const components = [
    { id: "text", label: "Text", icon: Type, description: "Add text content" },
    { id: "button", label: "Button", icon: Square, description: "Interactive button" },
    { id: "input", label: "Input", icon: Type, description: "Text input field" },
    { id: "image", label: "Image", icon: ImageIcon, description: "Image component" },
    { id: "card", label: "Card", icon: Square, description: "Container card" },
    { id: "list", label: "List", icon: List, description: "List of items" },
    { id: "checkbox", label: "Checkbox", icon: CheckSquare, description: "Checkbox input" },
    { id: "date", label: "Date", icon: Calendar, description: "Date picker" },
    { id: "currency", label: "Currency", icon: DollarSign, description: "Currency input" },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {components.map((component) => (
        <Card
          key={component.id}
          className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
          onClick={() => onSelectComponent(component.id)}
        >
          <component.icon className="w-8 h-8 text-primary mb-2" />
          <h3 className="font-semibold text-sm mb-1">{component.label}</h3>
          <p className="text-xs text-muted-foreground">{component.description}</p>
        </Card>
      ))}
    </div>
  )
}
