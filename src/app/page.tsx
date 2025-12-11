import HomepageComponent from '@/components/HomePage/HomepageComponent';
import { getAllProduct } from '@/lib/ssr/getAllProduct';
import { getCategory } from '@/lib/ssr/getCategory';
import { getAllBanners } from '@/lib/ssr/getAllBanners';

import { Metadata } from 'next';
import { getDocById } from '@/lib/ssr/getDocById';
import { getContents } from '@/hooks/getContents';

export async function generateMetadata(): Promise<Metadata> {
	const data = await getDocById('seo/get/slug', 'home');

	return {
		title: 'Home | Alarm BD',
		// title: `${data?.title}` || 'Home | Alarm BD',
		description: data?.description,
		openGraph: {
			title: data?.title || 'Home || Alarm BD',
			description: data?.description,
			images: [data?.image],
			type: 'website',
			locale: 'en-us',
			url: `https://alarm-frontend-omega.vercel.app`,
			siteName: `Alarm BD`,
		},
	};
}

export default async function Home() {
	const contents = await getContents();
	const category = await getCategory();
	const categoryData = category?.doc;

	// const product = await getAllProduct();
	const banners = await getAllBanners();
	// const productData = product?.doc;

	// console.log('productData', productData);
	// console.log('categoryData', categoryData);
	//

	return (
		<HomepageComponent
			categoryData={categoryData}
			// productData={productData}
			banners={banners}
			contents={contents}
		/>
	);
}
