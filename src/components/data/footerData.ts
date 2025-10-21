export interface FooterSection {
  title: string;
  links: string[];
}

export const footerLinksData = [
	{
		title: 'About DDong',
		links: [
			{
				name: 'Although today online brands have started to release our smartphone Hit. Management Hit Trial Copenhagen.',
				route: '/',
			},
			{ name: 'Contact Us', route: '/' },
		],
	},
	{
		title: 'Collection.com',
		links: [
			{ name: 'Privacy and Cookie Policy', route: '/privacy-policy' },
			{ name: 'About Us', route: '/about-us' },
			{ name: 'Sales Of Terms', route: '/sales-terms' },
			// { name: 'Advanced Search', route: '/advanced-search' },
			{ name: 'Orders and Returns', route: '/returns' },
		],
	},
	{
		title: 'Customer Service',
		links: [
			{ name: 'Returns Policy', route: '/returns' },
			{ name: 'Product Recalls', route: '/product-recall' },
			{ name: 'Gift Customers', route: '/gift-customer' },
			{ name: 'Tax Exempt Program', route: '/tax-exempt-program' },
			{ name: 'Contact Us', route: '/contact-us' },
		],
	},
	{
		title: 'Get to know us',
		links: [
			{ name: 'About Us', route: '/about-us' },
			{ name: 'Corporate', route: '/corporate' },
			{ name: 'Suppliers', route: '/supplier' },
			{ name: 'Careers', route: '/career' },
			{ name: 'The Digital Museum', route: '/digital-museum' },
		],
	},
	// {
	// 	title: 'In the spotlight',
	// 	links: [
	// 		{ name: 'Beauty & Lifestyle', route: '/' },
	// 		{ name: 'Beverages', route: '/' },
	// 		{ name: 'Invictus II Central', route: '/' },
	// 		{ name: 'Meals', route: '/' },
	// 		{ name: 'Condiments', route: '/' },
	// 	],
	// },
];


export const socialLinks = [
  { name: 'Facebook', icon: 'facebook' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'YouTube', icon: 'youtube' }
];

export const paymentMethods = [
  'visa', 'mastercard', 'amex', 'paypal', 'apple-pay', 'google-pay', 
  'stripe', 'klarna', 'afterpay', 'shopify', 'amazon', 'target', 
  'walmart', 'ebay', 'alibaba', 'rakuten', 'zalando', 'otto',
  'myntra', 'flipkart', 'snapdeal', 'paytm', 'phonepe', 'gpay',
  'bhim', 'mobikwik', 'freecharge', 'airtel', 'jio', 'vodafone'
];