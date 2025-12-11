import ProductPageComponent from '@/components/ProductPage/ProductPageComponent';
import { getContents } from '@/hooks/getContents';
import { getAllProduct } from '@/lib/ssr/getAllProduct';
import { getSingleProductBySlug } from '@/lib/ssr/getSingleProductBySlug';
import { Metadata } from 'next';

interface PageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata(
	{ params }: any,
	parent: any
): Promise<Metadata> {
	const { id } = params;

	const data = await getSingleProductBySlug(id);
	const metaData = data?.meta;
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: `${data?.name} | Alarm`,
		description: metaData?.description || data?.description,
		openGraph: {
			title: metaData?.title || data?.name,
			description: metaData?.description || data?.description,
			images: [data?.image, ...previousImages],
			type: 'website',
			locale: 'en-us',
			url: `https://alarm-frontend-omega.vercel.app`,
			siteName: `Alarm`,
		},
	};
}

export default async function ProductPage({ params }: PageProps) {
	const { id } = await params;

	const productData = await getSingleProductBySlug(id);
	const contents = await getContents();
	return <ProductPageComponent productData={productData} contents={contents} />;
}
