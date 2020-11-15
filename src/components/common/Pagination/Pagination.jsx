import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import s from './Pagination.module.css'


const Pagination = ({ totalItemsCount = 0, pageSize = 10, currentPage = 1, handlePageNumberClick }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pagesNumbers = [];

    if (
        pagesCount > 5 &&
        (currentPage === 1 ||
            currentPage === 2 ||
            currentPage === pagesCount - 1 ||
            currentPage === pagesCount)) {
        pagesNumbers = [1, 2, '...', pagesCount - 1, pagesCount];
    } else if (pagesCount <= 5) {
        for (let i = 1; i <= pagesCount; i++) {
            pagesNumbers.push(i);
        }
    } else if (currentPage > 2 || currentPage < pagesCount - 1) {
        pagesNumbers = [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            pagesCount,
        ];
    }
    let [pageNumber, setPageNumber] = useState(currentPage);

    return (
        <div className={s.wrapper}>

            <button
                disabled={currentPage > 1 ? false : true}
                onClick={() => {
                    setPageNumber(--pageNumber);
                    handlePageNumberClick(pageNumber);
                }}
                className={s.paginationItem + ' ' + (currentPage > 1 ? '' : s.disabled)}
            >
                <AiOutlineArrowLeft />
            </button>

            <div className={s.pagesWrapper}>
                {pagesNumbers.map((page, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageNumberClick(page)}
                        disabled={page === '...' ? true : false}
                        className={s.paginationItem + ' ' + (currentPage === +page ? s.active : '')}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                disabled={currentPage < pagesCount ? false : true}
                onClick={() => {
                    setPageNumber(++pageNumber);
                    handlePageNumberClick(pageNumber);
                }}
                className={s.paginationItem + ' ' + (currentPage < pagesCount ? '' : s.disabled)}
            >
                <AiOutlineArrowRight />
            </button>

        </div>
    )
}

export default Pagination;