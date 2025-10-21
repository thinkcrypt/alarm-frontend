import CategoryPageComponent from '@/components/Category/CategoryPageComponent';
import { getAllProduct } from '@/lib/ssr/getAllProduct';
import getASingleCategory from '@/lib/ssr/getASingleCategory';
import { getCategory } from '@/lib/ssr/getCategory';
import { Metadata } from 'next';

export async function generateMetadata({ params }: any, parent: any): Promise<Metadata> {
	const { id: categoryId } = await params;
	const singleCategoryData = await getASingleCategory(categoryId);
	const metaData = singleCategoryData?.meta;
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: `${metaData?.title || singleCategoryData?.name} | DDONG`,
		description: metaData?.description || singleCategoryData?.description,
		openGraph: {
			title: metaData?.title || singleCategoryData?.name,
			description: metaData?.description || singleCategoryData?.description,
			images: [singleCategoryData?.image, ...previousImages],
			type: 'website',
			locale: 'en-us',
			url: `https://ddongbd.com`,
			siteName: `DDONG`,
		},
	};
}

export default async function Category({ params }: any) {
	const { id: categoryId } = await params;

	const singleCategoryData = await getASingleCategory(categoryId);

	const category = await getCategory();
	const categoryData = category?.doc;

	const products = await getAllProduct(singleCategoryData?._id);
	const productsData = products?.doc;

	const categoryProducts = productsData?.filter(
		(product: any) => product.category.id === singleCategoryData?.id
	);

	return (
		<CategoryPageComponent
			singleCategoryData={singleCategoryData}
			categoryProducts={categoryProducts}
			categoryData={categoryData}
		/>
	);
}
