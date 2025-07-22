import { fetchAllBookAPI } from "../services/api.service";
import { useEffect, useState } from "react";
import BookTable from "../components/book/book.Table";
// import BookForm from "../components/book/book.Form";

function BookPage() {
  const [dataBooks, setDataBooks] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadBook();
  }, [current, pageSize]);

  const loadBook = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data) {
      setDataBooks(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <BookTable
        loadBook={loadBook}
        dataBooks={dataBooks}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
      {/* <BookForm loadBook={loadBook} /> */}
    </div>
  );
}

export default BookPage;
