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
  // 페이지가 하나뿐일 때는 버튼을 비활성화
  const isSinglePage = totalPages <= 1;

  return (
    <div className="flex justify-center mt-4">
      <button onClick={onPrevPage} disabled={currentPage === 1 || isSinglePage}>
        이전
      </button>
      <div className="flex justify-center mx-3">
        {currentPage} / {Math.max(totalPages, 1)}
      </div>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages || isSinglePage}
      >
        다음
      </button>
    </div>
  );
};
