import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  filterProducts,
  searchProducts,
  getInitialQuery,
} from "../helpers/helper";

import Card from "./../components/Card";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";

import styles from "./styles/ProductsPage.module.css";
//redux
import { fetchProducts } from "../features/product/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import { defaultState } from "../features/cart/cartSlice";

function ProductsPage() {
  const { products, loading } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const checkout = useSelector((store) => store.cart.checkout);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    dispatch(fetchProducts());
    if (checkout) {
      dispatch(defaultState());
      console.log(checkout);
    }
  }, []);

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearch(query.search || "");
    setSearchParams(query);
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setQuery={setQuery} setSearch={setSearch} />
      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
