import type { ValidationError } from 'class-validator'

type ValidationContext = Record<string, unknown> & { rule?: string }
type ValidationContexts = Record<string, ValidationContext> | undefined

export interface ValidationErrorMessage {
  field: string
  rule: string
  message: string
  meta?: Record<string, unknown>
}

export function formatValidationErrors(
  errors: ValidationError[],
  messages: ValidationErrorMessage[] = []
): ValidationErrorMessage[] {
  errors.forEach(error => {
    if (error.children && error.children.length > 0) {
      return formatValidationErrors(error.children, messages)
    }

    const constraints = Object.entries(
      error.constraints as Record<string, string>
    )

    const contexts = error.contexts as ValidationContexts

    for (const constraint of constraints) {
      const [key, message] = constraint
      const rule = contexts?.[key]?.rule ?? key

      messages.push({
        field: error.property,
        message,
        rule,
        meta: contexts?.[key] ?? undefined
      })
    }
  })

  return messages
}
