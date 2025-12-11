
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import CategoryCard2 from './CategoryCard2';

type CategoryShowcase2Props = {
	categoryData: any;
};

const CategoryShowcase2: React.FC<CategoryShowcase2Props> = ({
	categoryData,
}) => {
	const identifiers = useMemo(() => categoryData?.list || [], [categoryData]);
	const [categories, setCategories] = useState<any[]>([]);
	const perRow = Number(categoryData?.content) || 3;

	useEffect(() => {
		const controller = new AbortController();

		const fetchCategory = async (identifier: string) => {
			const baseUrl = process.env.NEXT_PUBLIC_BACKEND;
			if (!baseUrl) return null;

			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
			};

			const token = process.env.NEXT_PUBLIC_TOKEN;
			if (token) headers['authorization'] = token;

			try {
				const res = await fetch(`${baseUrl}/user-api/categories/${identifier}`, {
					headers,
					signal: controller.signal,
				});
				if (!res.ok) return null;
				return res.json();
			} catch (error: any) {
				if (error?.name !== 'AbortError') {
					console.error('Failed to fetch category', identifier, error);
				}
				return null;
			}
		};

		const loadCategories = async () => {
			if (!identifiers?.length) {
				setCategories([]);
				return;
			}

			const resolved = await Promise.all(
				identifiers.map((identifier: string) => fetchCategory(identifier))
			);
			setCategories(resolved.filter(Boolean));
		};

		loadCategories();

		return () => controller.abort();
	}, [identifiers]);

	if (!identifiers?.length) return null;

	return (
		<Grid
			px={{ base: 4, md: 7, lg: '32px', '2xl': '84px' }}
			templateColumns={{
				base: 'repeat(1, 1fr)',
				sm: 'repeat(2, 1fr)',
				md: 'repeat(2, 1fr)',
				lg: `repeat(${perRow}, 1fr)`,
			}}
			gap={{ base: 2, md: 6, xl: 4 }}
			w='100%'
		>
			{categories?.map((category: any, i: number) => {
				const identifier = identifiers?.[i];
				const hrefId = category?._id || category?.id || identifier;

				return (
					<Link key={hrefId || i} href={`/category/${hrefId || ''}`}>
						<GridItem>
							<CategoryCard2 category={category} />
						</GridItem>
					</Link>
				);
			})}

			{/* Keep the grid shape stable even if fetches fail */}
			{!categories?.length &&
				identifiers?.map((identifier: string, i: number) => (
					<GridItem key={identifier || i} />
				))}
		</Grid>
	);
};

export default CategoryShowcase2;


/////////////////////// version 1 (works but breaks the header category fetch for some reason)
// import React from 'react';
// import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
// import Link from 'next/link';
// import CustomContainer from '../reusable/Container';
// import CategoryCard2 from './CategoryCard2';
// import getASingleCategory from '@/lib/ssr/getASingleCategory';

// type CategoryShowcase2Props = {
// 	categoryData: any;
// };

// const CategoryShowcase2: React.FC<CategoryShowcase2Props> = ({
// 	categoryData,
// }) => {
// 	// const homePageCategories = categoryData?.filter(category => category.displayInHomePage);
// 	const perRow = categoryData?.content || 3;

// 	return (
// 		<Grid
// 			px={{ base: 4, md: 7, lg: '32px', '2xl': '84px' }}
// 			// templateColumns={`repeat(${gridColumns}, 1fr)`}
// 			templateColumns={{
// 				base: 'repeat(1, 1fr)',
// 				sm: 'repeat(2, 1fr)',
// 				md: 'repeat(2, 1fr)',
// 				lg: `repeat(${perRow}, 1fr)`,
// 			}}
// 			gap={{ base: 2, md: 6, xl: 4 }}
// 			w='100%'
// 		>
// 			{categoryData?.list?.map((category: any, i: number) => (
// 				<CatItem key={i} id={category} />
// 			))}
// 		</Grid>
// 	);
// };
// const CatItem = async ({ id }: { id: string }) => {
// 	const category = await getASingleCategory(id);
// 	return (
// 		<Link href={`/category/${category?._id}`} passHref>
// 			<GridItem>
// 				{/* <CategoryCard category={getCatById} /> */}
// 				<CategoryCard2 category={category} />
// 			</GridItem>
// 		</Link>
// 	);
// };

// export default CategoryShowcase2;
