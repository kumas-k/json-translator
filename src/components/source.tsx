import { twMerge } from 'tailwind-merge'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box } from '@radix-ui/themes'
import useSourceStore from '../stores/source-store'
import { sourceLineValidate } from '../utils/source-line-validate'
import EditDialog from './edit-dialog'
import { useHotkeys } from 'react-hotkeys-hook'

const ROW_SIZE = 1000

const parseLine = (line: string) => {
  const [key, , value] = line
    .split('//')[0]
    .trim()
    .replace(/,\s*$/, '')
    .slice(1)
    .slice(0, -1)
    .split(/":(\s+)?"/)
    .map((e) => e.trim())

  return { key, value }
}

const Source = () => {
  const { source, currentIndex, setCurrentIndex, page } = useSourceStore()
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')

  useHotkeys('mod+enter', (_, { mod, keys }) => {
    const [key] = keys ?? []

    if (key === 'enter' && mod) {
      const index = pageIndex + currentIndex
      const text = source.at(index) ?? ''

      if (!sourceLineValidate(text)) {
        return
      }

      const { value } = parseLine(text)

      setIsOpen(true)
      setText(value)
    }
  })

  useEffect(() => {
    if (source.length <= 0) {
      return
    }

    const index = source.findIndex(
      (text, index) => sourceLineValidate(text) && index >= currentIndex,
    )

    setCurrentIndex(index)
  }, [currentIndex, setCurrentIndex, source])

  const onClick = useCallback(
    ({ text, index }: { text: string; index: number }) => {
      if (!sourceLineValidate(text)) {
        return
      }

      const { value } = parseLine(text)

      setCurrentIndex(index)
      setIsOpen(true)
      setText(value)
    },
    [setCurrentIndex],
  )

  const pageIndex = useMemo(() => page * ROW_SIZE, [page])

  return (
    <>
      {isOpen && (
        <EditDialog isOpen={isOpen} setIsOpen={setIsOpen} text={text} />
      )}
      <section
        className={twMerge(
          'whitespace-pre-wrap w-full text-[16px] bg-[--gray-4] p-[14px] overflow-y-auto',
        )}
      >
        {source.slice(pageIndex, pageIndex + ROW_SIZE).map((text, index) => {
          return (
            <Box
              key={index}
              className={twMerge(
                'flex',
                pageIndex + index === currentIndex && 'bg-[--accent-6]',
              )}
              onClick={() => onClick({ text, index: pageIndex + index })}
            >
              <div className="min-w-[40px] w-[40px] mr-[10px] inline-block text-right text-[12px] text-gray-500">
                {pageIndex + index + 1}
              </div>
              <div>{text}</div>
            </Box>
          )
        })}
      </section>
    </>
  )
}

export default Source
