export interface StoreLocation {
	id: string;
	area: string;
	city: string;
	address: string;
	phone: string;
	hours: string;
}

export interface InfoSection {
	title: string;
	description: string;
}

export const infoSections: InfoSection[] = [
	{
		title: 'ONLINE SHOPPING MADE EASY AT DDONG',
		description: `If you would like to experience the best of online shopping for men, women and kids in India, you are at the right place. DDONG is the ultimate destination for fashion and lifestyle, being host to a wide array of merchandise including clothing, footwear, accessories, jewellery, personal care products and more. It is time to redefine your style statement with our treasure-trove of trendy items. Our online store brings you the latest in designer products straight out of fashion houses. You can shop online at DDONG from the comfort of your home and get your favourites delivered right to your doorstep.`,
	},
	{
		title: 'BEST ONLINE SHOPPING SITE IN BANGLADESH FOR FASHION',
		description: `Be it clothing, footwear or accessories, DDONG offers you the ideal combination of fashion and functionality for men, women and kids. You will realise that the sky is the limit when it comes to the types of outfits that you can purchase for different occasions.`,
	},
];

export const storeLocations: StoreLocation[] = [
	{
		id: '1',
		area: 'Noakhali',
		city: 'Maijdee',
		address: 'বড় মসজিদ রোড (আলাল হোটেলের পাশে), মাইজদী,নোয়াখালী।',
		phone: 'Tel: 01323070641',
		hours: 'Shopping Hours: 10.00 AM To 10.30 PM',
	},
	{
		id: '2',
		area: 'Sylhet',
		city: 'Goldren City',
		address: 'গোল্ডেন সিটি হোটেল এর অপজিট পাশে,পূর্ব জিন্দাবাজার, সিলেট।',
		phone: 'Tel: 01323070642',
		hours: 'Shopping Hours: 10.00 AM To 10.30 PM',
	},
	{
		id: '3',
		area: 'Sylhet',
		city: 'Noya sarok',
		address:
			'সিনেমা কমপ্লেক্স, নয়াসড়ক, ব্যাংক এশিয়া এর পাশে, বাকতখানা পয়েন্ট, পূর্ব জিন্দাবাজার, সিলেট',
		phone: 'Tel: 01323070643',
		hours: 'Shopping Hours: 10.00 AM To 10.30 PM',
	},
	{
		id: '4',
		area: 'Naiorpool Point',
		city: 'Sylhet',
		address:
			'নাইওরপুল পয়েন্ট, কুমারপাড়া রোড, ওয়াল উপাত্ত বিল্ডিং ও শিল্প ব্যাসাদ এর অপোজিট সাইড, সিলেট।',
		phone: 'Tel: 01327946321',
		hours: 'Shopping Hours: 10.00 AM To 10.30 PM',
	},
];
