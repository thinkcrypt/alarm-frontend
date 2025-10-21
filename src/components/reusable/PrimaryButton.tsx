'use client';
import React from 'react';
import Link from 'next/link';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

interface PrimaryButtonProps extends ChakraButtonProps {
	bgColor?: string;
	colorPalette?: string;
	color?: string;
	border?: any;
	customBorderRadius?: string | number;
	wFraction?: string;
	href?: any; // <-- add href
}

const widthMap: Record<string, string> = {
	'1/2': '50%',
	'1/3': '33.3333%',
	full: '100%',
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
	bgColor,
	colorPalette,
	customBorderRadius,
	wFraction,
	color,
	_hover,
	href,
	border,
	...props
}) => {
	const width = wFraction ? widthMap[wFraction] ?? wFraction : props.width;
	const borderRadius = customBorderRadius ?? props.borderRadius;
	const hoverStyle = _hover;
	const textcolor = color;

	// If href exists, render as a Next.js Link
	if (href) {
		return (
			<Link
				href={href}
				passHref
				legacyBehavior>
				<ChakraButton
					as='a'
					size={props.size ?? 'sm'}
					bg={bgColor ?? props.bg}
					border={border}
					borderRadius={borderRadius}
					borderTopRightRadius={props.borderTopRightRadius}
					color={textcolor}
					w={width}
					variant={props.variant}
					_hover={hoverStyle}
					{...props}
				/>
			</Link>
		);
	}

	// Otherwise, render as a normal button
	return (
		<ChakraButton
			size={props.size ?? 'sm'}
			bg={bgColor ?? props.bg}
			borderRadius={borderRadius}
			borderTopRightRadius={props.borderTopRightRadius}
			color={textcolor}
			border={border}
			w={width}
			variant={props.variant}
			_hover={hoverStyle}
			{...props}
		/>
	);
};

export default PrimaryButton;
