import { useEffect, useState } from "react";
import api from "../api";

const useProducts = ({ keyword, category }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPaging, setNextPaging] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);

  async function fetchProducts() {
    const isTheLastPage = nextPaging === undefined;
    if (isTheLastPage) return;
    if (isLoading) return;

    setIsLoading(true);
    const response = keyword
      ? await api.searchProducts(keyword, nextPaging)
      : await api.getProducts(category, nextPaging);

    const isTheFirstPage = nextPaging === 0;
    if (isTheFirstPage) {
      setProducts(response.data);
    } else {
      setProducts((prev) => [...prev, ...response.data]);
    }

    setNextPaging(response.next_paging);
    setIsLoading(false);
  }

  function initializeProducts() {
    setProducts([]);
    setNextPaging(0);
    setShouldReset(true);
  }

  useEffect(initializeProducts, [keyword, category]);

  useEffect(() => {
    if (!shouldReset) return;
    fetchProducts();
    setShouldReset(false);
  }, [shouldReset]);

  return { products, loadMoreProducts: fetchProducts, isLoading };
};

export default useProducts;
