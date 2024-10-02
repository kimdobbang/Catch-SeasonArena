interface NumberPaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export const NumberPagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}: NumberPaginationProps) => {
  return (
    <div className="flex justify-center mt-4">
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        이전
      </button>
      <div className="flex justify-center mx-3">
        {/* <div className="mx-3"> */}
        {currentPage} / {totalPages}
      </div>
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
};
