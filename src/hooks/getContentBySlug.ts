// Place this function in a suitable file or directly in your component

type ContentItem = {
	slug: string;
	[key: string]: any;
};

function getContentBySlug(items: ContentItem[], slug: string): any | undefined {
	if (!items || !Array.isArray(items))
		return { error: true, message: 'Slug Not Found' };
	return items?.find(item => item.slug === slug);
}

export default getContentBySlug;
