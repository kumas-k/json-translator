import translate from 'translate'
import { Engine } from '../stores/preference-store'

export async function fetchTranslate({
  value,
  engine,
  target,
  key,
}: {
  value: string
  engine: Engine
  target: string
  key?: string
}) {
  translate.engine = engine
  translate.key = key

  const text = await translate(value, { to: target })

  return text
}
