export const newArrivals = Array.from({ length: 5 }, () => ({
  image: "/image-9.webp",
  title: "Premium Cotton T-Shirt",
  price: "899",
  originalPrice: "1299",
  discount: "30",
}));

export const signatureProducts = Array.from({ length: 5 }, () => ({
  image: "/api/placeholder/250/200",
  title: "Signature Polo Shirt",
  price: "1299",
  originalPrice: "1899",
  discount: "25",
}));


// data.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isViewMore?: boolean;
}

// ✅ Full product type for catalog
export interface DetailedProduct {
	id: number;
	name: string;
	price: number;
	oldPrice: number;
	discount: number;
	color: string;
	sizes: string[];
	sku: string;
	category: string;
	subcategory: string;
	images: any[];
	sizeChart: string;
	description?: string;
	delivery?: string;
	vat?: string;
}


export interface CategoryData {
  title: string;
  mainImage: string;
  products: Product[];
}

export interface CategoryItem {
  id: any;
  title: string;
  image: string;
}


export const menPoloData: CategoryData = {
  title: "Mens Collection",
  mainImage: "/image-1.webp",
  products: [
    {
      id: 1,
      name: "Classic Polo",
      price: 1200.00,
      originalPrice: 1500.00,
      image: "/image-2.webp"
    },
    {
      id: 2,
      name: "Striped Polo",
      price: 1140.00,
      originalPrice: 1400.00,
      image: "/image-3.webp"
    },
    {
      id: 3,
      name: "Premium Polo",
      price: 1140.00,
      originalPrice: 1450.00,
      image: "/image-4.webp"
    },
    {
      id: 4,
      name: "Sport Polo",
      price: 1140.00,
      originalPrice: 1450.00,
      image: "/image-5.webp"
    },
    {
      id: 5,
      name: "Contrast Polo",
      price: 790.00,
      originalPrice: 1100.00,
      image: "/image-6.webp"
    },
    {
      id: 6,
      name: "Mint Polo",
      price: 990.00,
      originalPrice: 1200.00,
      image: "/image-7.webp"
    },
    {
      id: 7,
      name: "Navy Polo",
      price: 990.00,
      originalPrice: 1250.00,
      image: "/image-8.webp"
    },
    {
      id: 8,
      name: "",
      price: 750.00,
      originalPrice: 950.00,
      image: "/image-9.jpg",
      isViewMore: true
    }
  ]
};

export const womenKurtiData: CategoryData = {
  title: "Women Collection",
  mainImage: "/image-10.jpg",
  products: [
    {
      id: 9,
      name: "Floral Kurti",
      price: 1140.00,
      originalPrice: 1450.00,
      image: "/image-11.webp"
    },
    {
      id: 10,
      name: "Purple Dress",
      price: 1950.00,
      originalPrice: 2200.00,
      image: "/image-12.png"
    },
    {
      id: 11,
      name: "Black Tunic",
      price: 1590.00,
      originalPrice: 1800.00,
      image: "/image-13.webp"
    },
    {
      id: 12,
      name: "Printed Top",
      price: 1290.00,
      originalPrice: 1500.00,
      image: "/image-14.webp"
    },
    {
      id: 13,
      name: "Floral Tunic",
      price: 1230,
      image: "/image-15.webp"
    },
    {
      id: 14,
      name: "Teal Dress",
      price: 1950.00,
      originalPrice: 2200.00,
      image: "/image-16.webp"
    },
    {
      id: 15,
      name: "Blue Top",
      price: 1150.00,
      originalPrice: 1250.00,
      image: "/image-1.webp"
    },
    {
      id: 16,
      name: "",
      price: 1250.00,
      originalPrice: 1500.00,
      image: "/image-2.webp",
      isViewMore: true
    }
  ]
};

export const categoryData: CategoryItem[] = [
	{
		id: 'Shirts',
		title: 'Shirts',
		image: 'image-2.webp'
	},
	{
		id: 'Panjabi',
		title: 'Panjabi',
		image: 'image-5.webp',
	},
	{
		id: 'Fashion Tops',
		title: 'Fashion Tops',
		image: 'image-1.webp',
	},
	{
		id: 'Exclusive Lawn',
		title: 'Exclusive Lawn',
		image: 'image-6.webp',
	},
];

export const product: DetailedProduct = {
  id: 1,
  name: 'Premium Jacquard Polo Shirts For Men',
  price: 1160,
  oldPrice: 1450,
  discount: 20,
  color: 'Navy Blue',
  sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
  sku: 'SU3P008',
  category: "Men's",
  subcategory: "Polo Shirt",
  images: ['/image-1.webp', '/image-2.webp', '/image-3.webp'],
  sizeChart: '/sizechart.webp',
  description: "...",
  delivery: "...",
};


export const products: DetailedProduct[] = [
	{
		id: 1,
		name: 'Premium Jacquard Polo Shirt For Men',
		price: 1160,
		oldPrice: 1450,
		discount: 20,
		color: 'Navy Blue',
		sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
		sku: 'SU3P001',
		category: "Men's",
		subcategory: 'Polo Shirt',
		images: ['/image-1.webp', '/image-2.webp', '/image-3.webp'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 2,
		name: 'Casual Cotton T-Shirt For Women',
		price: 890,
		oldPrice: 1100,
		discount: 19,
		color: 'Pink',
		sizes: ['S', 'M', 'L', 'XL'],
		sku: 'WO1T002',
		category: "Women's",
		subcategory: 'T-Shirt',
		images: ['/image-4.webp', '/image-5.webp', '/image-6.webp'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 3,
		name: 'Slim Fit Denim Jeans For Men',
		price: 1450,
		oldPrice: 1750,
		discount: 17,
		color: 'Dark Blue',
		sizes: ['30', '32', '34', '36', '38'],
		sku: 'MN2J003',
		category: "Men's",
		subcategory: 'Jeans',
		images: ['/image-7.webp', '/image-8.webp', '/image-9.jpg'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 4,
		name: 'Elegant Silk Saree For Women',
		price: 3200,
		oldPrice: 3900,
		discount: 18,
		color: 'Red',
		sizes: ['Free Size'],
		sku: 'WO2S004',
		category: "Women's",
		subcategory: 'Saree',
		images: ['/image-10.jpg', '/image-11.webp', '/image-12.png'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 5,
		name: 'Kids Cotton Shorts',
		price: 560,
		oldPrice: 750,
		discount: 25,
		color: 'Yellow',
		sizes: ['2Y', '3Y', '4Y', '5Y'],
		sku: 'KD1S005',
		category: "Kids'",
		subcategory: 'Shorts',
		images: ['/image-13.webp', '/image-14.webp', '/image-15.webp'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 6,
		name: 'Leather Formal Shoes For Men',
		price: 2200,
		oldPrice: 2650,
		discount: 17,
		color: 'Black',
		sizes: ['40', '41', '42', '43', '44'],
		sku: 'MN3F006',
		category: "Men's",
		subcategory: 'Shoes',
		images: ['/image-16.webp', '/image-5.webp', '/image-6.webp'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 7,
		name: 'Trendy Handbag For Women',
		price: 1850,
		oldPrice: 2100,
		discount: 12,
		color: 'Beige',
		sizes: ['One Size'],
		sku: 'WO3H007',
		category: "Women's",
		subcategory: 'Handbag',
		images: ['/proudct1.webp', '/product2.webp', '/product3.webp'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 8,
		name: 'Stylish Sunglasses',
		price: 1250,
		oldPrice: 1600,
		discount: 22,
		color: 'Brown',
		sizes: ['One Size'],
		sku: 'AC1S008',
		category: 'Accessories',
		subcategory: 'Sunglasses',
		images: ['/image-2.webp', '/image-11.webp', '/image-16.webp'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 9,
		name: 'Kids Party Dress',
		price: 1350,
		oldPrice: 1600,
		discount: 16,
		color: 'Purple',
		sizes: ['3Y', '4Y', '5Y', '6Y'],
		sku: 'KD2D009',
		category: "Kids'",
		subcategory: 'Dress',
		images: ['/image-7.webp', '/image-5.webp', '/image-14.webp'],
		sizeChart: '/sizechart.webp',
	},
	{
		id: 10,
		name: 'Sports Sneakers',
		price: 1750,
		oldPrice: 2100,
		discount: 17,
		color: 'White',
		sizes: ['40', '41', '42', '43', '44'],
		sku: 'FT1S010',
		category: 'Footwear',
		subcategory: 'Sneakers',
		images: ['/image-9.jpg', '/image-3.webp', '/image-1.webp'],
		sizeChart: '/sizechart.webp',
	},
];

