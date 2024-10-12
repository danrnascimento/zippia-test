import style from "./style.module.scss";

type PaginationProps = {
  page: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;

  onNextClick: () => void;
  onPrevClick: () => void;
};

export default function Pagination({
  page,
  hasNextPage,
  hasPrevPage,

  onNextClick,
  onPrevClick,
}: PaginationProps) {
  return (
    <div className={style.pagination}>
      <button disabled={!hasPrevPage} onClick={() => onPrevClick()}>
        Prev Page
      </button>

      <p>Page: {page}</p>
      <button disabled={!hasNextPage} onClick={() => onNextClick()}>
        Next Page
      </button>
    </div>
  );
}
