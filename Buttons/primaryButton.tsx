/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	GestureResponderEvent,
	StyleProp,
	ViewStyle,
	ActivityIndicator,
	ColorValue,
	Dimensions,
} from 'react-native';
import { K } from '../../constants/AppConstants';

type ButtonProps = {
	readonly onPress?: (event: GestureResponderEvent) => any;
	readonly onPressIn?: (event: GestureResponderEvent) => void;
	readonly onPressOut?: (event: GestureResponderEvent) => void;
	readonly onLongPress?: (event: GestureResponderEvent) => void;
	readonly disable?: boolean;
	readonly title: string;
	readonly activeOpacity?: number;
	readonly style?: StyleProp<ViewStyle>;
	readonly loading?: boolean,
	readonly size?: 'small' | 'medium' | 'large'
	readonly ButtonColor?: ColorValue,
	readonly ButtonTextColor?: ColorValue,
	readonly buttonTextSize?:number
};

const { width } = Dimensions.get('window')

const PrimaryButton = ({
	onPress,
	onPressIn,
	onPressOut,
	onLongPress,
	disable = false,
	title,
	activeOpacity,
	style,
	loading = false,
	ButtonTextColor,
	buttonTextSize,
	ButtonColor
}: ButtonProps) => {



	return (
		<TouchableOpacity
			onPress={onPress}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			onLongPress={onLongPress}
			disabled={disable}
			activeOpacity={activeOpacity}
			style={[
				styles.common_btn,
				style,
				disable && { opacity: 0.5 },
			]}>
			{
				loading ? <ActivityIndicator size={'large'} color={'white'} />
					: <Text style={[styles.textStyle, { color: ButtonTextColor ? ButtonTextColor : K.colorsConstants.white,fontSize:buttonTextSize }]} >
						{title || 'Primary button'}
					</Text>
			}


		</TouchableOpacity>
	);
}

export default PrimaryButton;

const styles = StyleSheet.create({
	common_btn: {
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		borderRadius: 50,
		backgroundColor: '#64C2C8',
		paddingVertical: 16,
		paddingHorizontal: 12,

	},
	textStyle: {
		fontSize: K.fontSizeConstants.regular,
		color: K.colorsConstants.white,
		fontFamily: K.fontFamilyConstants.Figtree.semiBold,

	},
	loadingIndicator: {
		color: 'white',
	}
});