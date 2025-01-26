import clsx from 'clsx'
export type PaginationProps = {
  currentPage?: number
  totalPages: number | undefined | null
  onPageChange: (pageNumber: number) => void
  disabled?: boolean
  pageSize?: number
}

export function Pagination({ disabled = false, currentPage = 1, totalPages, onPageChange, pageSize }: PaginationProps) {
  const isDisabled = disabled || !totalPages
  const renderButton = (page: number) => {
    return (
      <button
        className={clsx([
          `px-4 py-2 mx-1 border rounded`,
          `${isDisabled || page === currentPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`,
        ])}
        disabled={isDisabled || page === currentPage}
        onClick={() => onPageChange(page)}
        title={pageSize ? `Skip: ${pageSize * (page - 1)}` : undefined}
      >
        {page}
      </button>
    )
  }
  if (!totalPages) return null
  return (
    <div>
      {currentPage >= 3 ? (
        <>
          {renderButton(1)}
          <span>...</span>
        </>
      ) : null}
      {currentPage >= 2 ? renderButton(currentPage - 1) : null}
      {renderButton(currentPage)}
      {totalPages - currentPage >= 1 ? renderButton(currentPage + 1) : null}
      {totalPages - currentPage >= 2 ? (
        <>
          <span>...</span>
          {renderButton(totalPages)}
        </>
      ) : null}
    </div>
  )
}
