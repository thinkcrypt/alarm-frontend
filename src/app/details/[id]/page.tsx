import ProductPageComponent from '@/components/ProductPage/ProductPageComponent';
import { getAllProduct } from '@/lib/ssr/getAllProduct';
import { getSingleProduct } from '@/lib/ssr/getSingleProduct';

interface PageProps {
	params: Promise<{ id: string }>;
}

//68cfd4a40910c6a586a63898 sample product id

export default async function ProductPage({ params }: PageProps) {
	const { id } = await params;

	// fetch single product
	const productData = await getSingleProduct(id);

	return <ProductPageComponent productData={productData} />;
}
