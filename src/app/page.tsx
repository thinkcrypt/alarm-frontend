import HomepageComponent from '@/components/HomePage/HomepageComponent';
import { getAllProduct } from '@/lib/ssr/getAllProduct';
import { getCategory } from '@/lib/ssr/getCategory';
import { getAllBanners } from '@/lib/ssr/getAllBanners';

export default async function Home() {
	const category = await getCategory();
	const categoryData = category?.doc;

	const product = await getAllProduct();
	const banners = await getAllBanners();
	const productData = product?.doc;

	// console.log('productData', productData);
	// console.log('categoryData', categoryData);
	//

	return (
		<HomepageComponent
			categoryData={categoryData}
			productData={productData}
			banners={banners}
		/>
	);
}
