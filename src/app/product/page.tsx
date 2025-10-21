import AllProductsComponent from "@/components/ProductPage/AllProductsComponent";
import { getAllProduct } from "@/lib/ssr/getAllProduct";

export default async function page() {
    const products = await getAllProduct()
    const allProducts = products?.doc;

    return (
        <AllProductsComponent allProducts={allProducts}/>
    )
}