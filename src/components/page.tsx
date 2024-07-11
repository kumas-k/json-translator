import { twMerge } from 'tailwind-merge'
import useSourceStore from '../stores/source-store'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

const Page = () => {
  const { setPage, page, source } = useSourceStore()

  const existsNextPage = Math.ceil(source.length / 1000) > page + 1
  const existsPreviousPage = 0 < page

  if (source.length < 1000) {
    return null
  }

  return (
    <div className="fixed flex z-50 bottom-0 right-0 gap-4 m-[20px]">
      <div
        className={twMerge(
          'w-[50px] h-[50px] bg-[--accent-5] flex justify-center items-center rounded-full',
          !existsPreviousPage && 'opacity-30',
        )}
        onClick={() => existsPreviousPage && setPage(page - 1)}
      >
        <ArrowLeftIcon width={18} height={18} />
      </div>
      <div
        className={twMerge(
          'w-[50px] h-[50px] bg-[--accent-5] flex justify-center items-center rounded-full',
          !existsNextPage && 'opacity-30',
        )}
        onClick={() => existsNextPage && setPage(page + 1)}
      >
        <ArrowRightIcon width={18} height={18} />
      </div>
    </div>
  )
}

export default Page
