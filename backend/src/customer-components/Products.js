import { useOutletContext, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AllProducts from './product-display/AllProducts';

export default function Products() {
  const { products, filterProducts, filterProductByCategory, sortProductsByPrice, searchProductsByTitle } = useOutletContext();
  const { categoryId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const search = query.get("search");

    if (search) {
      searchProductsByTitle(search);
    } else if (categoryId === 'all') {
      filterProductByCategory('all');
    } else {
      const matchedProduct = products?.find((product) => product.category?.id?.toString() === categoryId);
      if (matchedProduct) {
        filterProductByCategory(matchedProduct.category.name);
      } else {
        filterProductByCategory('all');
      }
    }
  }, [categoryId, products, location.search]);

  return (
    <div>
      <AllProducts productsValue={filterProducts} onSortProductsByPrice={sortProductsByPrice} allProductsValue={products}/>
    </div>
  );
}
