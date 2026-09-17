import { ReactNode } from 'react'

interface Props {
  schema: Record<string, any>
}

export default function SchemaScript ({ schema }: Props) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}
