import styles from "./pagination.module.css";
export type PaginationProps = {
  currentPage?: number;
  totalPages: number | undefined | null;
  onPageChange: (pageNumber: number) => void;
  disabled?: boolean;
  pageSize?: number;
};

export function Pagination({
  disabled = false,
  currentPage = 1,
  totalPages,
  onPageChange,
  pageSize,
}: PaginationProps) {
  const isDisabled = disabled || !totalPages;
  const renderButton = (page: number) => {
    return (
      <button
        disabled={isDisabled || page === currentPage}
        onClick={() => onPageChange(page)}
        title={pageSize ? `Skip: ${pageSize * (page - 1)}` : undefined}
      >
        {page}
      </button>
    );
  };
  if (!totalPages) return null;
  return (
    <div className={styles.pagination}>
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
  );
}
