// Category page styling constants to match website design system
export const categoryStyles = {
	// Main layout
	pageContainer: {
		bg: 'white',
		minH: '100vh',
	},

	contentContainer: {
		maxW: '1400px',
		mx: 'auto',
		bg: 'white',
		px: { base: 4, md: 6, lg: 16 }, // 64px on lg (16 * 4 = 64px)
		py: { base: 4, md: 6 },
		pt: 2,
	},

	// Breadcrumb navigation
	breadcrumbContainer: {
		py: 4,
		pt: 1,
		mb: { base: 4, md: 0 },
	},

	breadcrumbText: {
		fontSize: 'xs',
		color: 'gray.600',

		_hover: { color: 'black' },
		cursor: 'pointer',
	},

	breadcrumbCurrent: {
		fontSize: 'xs',
		color: 'black',
		fontWeight: '500',
	},

	// Header section
	headerContainer: {
		mb: { base: 6, md: 8 },
		textAlign: 'left', // Left align the header
	},

	categoryTitle: {
		fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
		fontWeight: '600',
		color: 'black',

		letterSpacing: '-0.025em',
		mb: 2,
		textAlign: 'left', // Left align title
	},

	categorySubtitle: {
		fontSize: { base: 'sm', md: 'md' },
		color: 'gray.600',

		mb: { base: 4, md: 6 },
		textAlign: 'left', // Left align subtitle
	},

	// Filter and sort section
	filterSortContainer: {
		mb: { base: 4, md: 6 },
	},

	filterButton: {
		bg: 'white',
		border: '1px solid',
		borderColor: 'gray.200',
		borderRadius: 'md',
		px: 4,
		py: 3,

		fontWeight: '500',
		fontSize: 'sm',
		color: 'black',
		_hover: {
			bg: 'gray.50',
			borderColor: 'gray.300',
		},
		_active: {
			bg: 'gray.100',
		},
	},

	sortContainer: {
		bg: 'white',
		border: '1px solid',
		borderColor: 'gray.200',
		borderRadius: 'none',
		px: 3,
		py: 2.5,
	},

	sortButton: {
		bg: 'transparent',
		border: 'none',

		fontWeight: '500',
		fontSize: 'sm',
		color: 'black',
		_hover: {
			bg: 'gray.50',
		},
	},

	// Filter sidebar
	filterSidebar: {
		position: 'sticky',
		top: '120px',
		h: 'fit-content',
		maxH: 'calc(100vh - 140px)',
		overflowY: 'auto',
		display: { base: 'none', lg: 'block' },
	},

	filterSection: {
		bg: 'white',
		border: '1px solid',
		borderColor: 'gray.200',
		borderRadius: 'none',
		p: 4,
		mb: 2,
	},

	filterTitle: {
		fontSize: 'sm',
		fontWeight: '600',
		color: 'black',

		mb: 3,
	},

	filterOption: {
		fontSize: 'sm',
		color: 'black',
		textTransform: 'capitalize',
		fontWeight: '300',
		_hover: { color: 'black' },
	},

	// Product grid
	productGridContainer: {
		w: 'full',
	},

	productGrid: {
		templateColumns: {
			base: 'repeat(2, 1fr)',
			md: 'repeat(2, 1fr)',
			lg: 'repeat(4, 1fr)',
			xl: 'repeat(4, 1fr)',
		},
		gap: { base: 1, md: 1 }, // Reduced gap for product cards
		w: 'full',
	},

	// Results info
	resultsInfo: {
		mb: 4,
		py: 3,
		borderBottom: '1px solid',
		borderColor: 'gray.200',
	},

	resultsText: {
		fontSize: 'sm',
		color: 'gray.600',
	},

	resultCount: {
		fontWeight: '500',
		color: 'black',
	},

	// Mobile filter overlay
	mobileFilterOverlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		bg: 'blackAlpha.500',
		zIndex: 1000,
		display: { base: 'flex', lg: 'none' },
	},

	mobileFilterPanel: {
		bg: 'white',
		w: '100%',
		maxW: '400px',
		h: '100%',
		overflowY: 'auto',
		p: 6,
	},

	// Empty state
	emptyState: {
		textAlign: 'center',
		py: { base: 12, md: 16 },
	},

	emptyStateTitle: {
		fontSize: 'xl',
		fontWeight: '600',
		color: 'black',

		mb: 2,
	},

	emptyStateText: {
		fontSize: 'md',
		color: 'gray.600',
	},
};
