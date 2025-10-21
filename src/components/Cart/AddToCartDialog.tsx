'use client';
import { useState } from 'react';
import { DetailedProduct } from '../data/productData';
import { CloseButton, Dialog, Portal, useBreakpointValue } from '@chakra-ui/react';
import PrimaryButton from '../reusable/PrimaryButton';
import MobileDialog from './MobileDialog';
import DesktopDialog from './DesktopDialog';

interface BuyNowDialogProps {
	product: DetailedProduct;
}

const BuyNowDialog: React.FC<BuyNowDialogProps> = ({ product }: any) => {
	const [open, setOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(product?.images[0]);

	// Responsive breakpoint values
	const isSmallScreen = useBreakpointValue({ base: true, md: false });
	const imageHeight = useBreakpointValue({ base: '250px', md: '400px' }) || '250px';
	const thumbnailSize = useBreakpointValue({ base: '60px', md: '100px' }) || '60px';

	const images = product?.images;

	return (
		<Dialog.Root
			open={open}
			onOpenChange={e => setOpen(e.open)}
			motionPreset='scale'
			placement='center'>
			<Dialog.Trigger asChild>
				<PrimaryButton
					onClick={e => e.stopPropagation()}
					bgColor='#0d1426'>
					Shop Now
				</PrimaryButton>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content
						maxW={{
							base: '95vw',
							sm: '90vw',
							md: '85vw',
							lg: '80vw',
							xl: '6xl',
						}}
						maxH={{ base: '95vh', md: '90vh' }}
						bg='white'
						p={{ base: 4, md: 6, lg: 8 }}
						borderRadius='lg'
						shadow='lg'
						overflow='auto'>
						{isSmallScreen ? (
							<MobileDialog
								selectedImage={selectedImage}
								setSelectedImage={setSelectedImage}
								images={images}
								imageHeight={imageHeight}
								thumbnailSize={thumbnailSize}
								product={product}
							/>
						) : (
							<DesktopDialog
								selectedImage={selectedImage}
								setSelectedImage={setSelectedImage}
								images={images}
								imageHeight={imageHeight}
								thumbnailSize={thumbnailSize}
								product={product} // ✅ currentProduct এর বদলে product
							/>
						)}

						<Dialog.CloseTrigger asChild>
							<CloseButton
								size={{ base: 'md', md: 'lg' }}
								position='absolute'
								top={{ base: 2, md: 4 }}
								right={{ base: 2, md: 4 }}
								zIndex='popover'
							/>
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default BuyNowDialog;
