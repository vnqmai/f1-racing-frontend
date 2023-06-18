import React, { useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";

export interface IF1PaginationProps {
  totalDocs: number;
  docsPerpage: number;
  onSelect: (page: number) => void;
}

export default function F1Pagination(props: IF1PaginationProps) {
  const { totalDocs, docsPerpage, onSelect } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onSelect(page);
  };

  return (
    <div className="f1-pagination">
      <PaginationControl
        page={currentPage}
        between={3}
        total={totalDocs}
        limit={docsPerpage}
        changePage={(page) => handlePageClick(page)}
        ellipsis={1}
        last={true}
      />
    </div>
  );
}
