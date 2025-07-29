import { fetchAllBookAPI } from "../services/api.service";
import { useCallback, useEffect, useState } from "react";
import BookTable from "../components/book/book.Table";
import BookFormUnControlled from "../components/book/book.Form.Uncontrolled";
// import BookFormControlled from "../components/book/book.Form.Controlled";

function BookPage() {
  const [dataBooks, setDataBooks] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataForm, setDataForm] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const loadBook = useCallback(async () => {
    setLoading(true);
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data) {
      setDataBooks(res.data.result);
      // setCurrent(res.data.meta.current);
      // setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
      setLoading(false)
    }
  }, [current, pageSize]);

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  return (
    <div style={{ padding: "20px" }}>
      <BookTable
        loadBook={loadBook}
        dataBooks={dataBooks}
        loading={loading}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* <BookFormControlled
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        loadBook={loadBook}
      /> */}

      <BookFormUnControlled
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        loadBook={loadBook}
        setLoading={setLoading}
        loading={loading}
        dataForm={dataForm}
        setDataForm={setDataForm}
      />
    </div>
  );
}

export default BookPage;
