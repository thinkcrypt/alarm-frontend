import AllCategoryComponent from '@/components/Category/AllCategoryComponent';
import { getCategory } from '@/lib/ssr/getCategory';
import React from 'react'

export default async function page() {
    const category = await getCategory();
    const categoryData = category?.doc;

    return (
        <AllCategoryComponent
            categoryData={categoryData}
        />
    )
}