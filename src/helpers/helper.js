const shortenText = (text) => {
  return text.split(" ").splice(0, 3).join(" ");
};

const searchProducts = (products, search) => {
  if (!search) return products;
  const searchedProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search)
  );
  return searchedProducts;
};

const filterProducts = (products, category) => {
  if (!category) return products;
  const filteredProducts = products.filter(
    (item) => item.category === category
  );
  return filteredProducts;
};

const createQueryObject = (curQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = curQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = curQuery;
    return rest;
  }
  return { ...curQuery, ...newQuery };
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  if (search) query.search = search;
  if (category) query.category = category;
  return query;
};

const sumQuantity = (products) => {
  return products.reduce((total, product) => total + product.quantity, 0);
};

const sumPrice = (products) => {
  return products
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
};

const productQuantity = (state, id) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return 0;
  } else {
    return state.selectedItems[index].quantity;
  }
};

export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  productQuantity,
  sumPrice,
  sumQuantity,
};
