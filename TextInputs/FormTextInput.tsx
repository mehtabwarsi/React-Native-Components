import React, { useState } from "react";
import {
	Text,
	View,
	TextInput,
	StyleSheet,
	StyleProp,
	ViewStyle,
	ColorValue,
	useWindowDimensions,
	NativeSyntheticEvent,
	TextInputChangeEventData,
	TextInputFocusEventData,
	TouchableOpacity,
	KeyboardTypeOptions,
	I18nManager,
	Platform,
} from "react-native";
import IcCloseEyeIcon from "../../assets/Icons/IcCloseEyeIcon";
import IcOpenEyeIcon from "../../assets/Icons/IcOpenEyeIcon";
import { K } from "../../constants/AppConstants";
import IcErrorIcon from "../../assets/Icons/IcErrorIcon";
import { FieldError } from "react-hook-form";

type TextInputProps = {
	readonly ref?: React.LegacyRef<TextInput> | undefined;
	readonly inputValue?: any;
	readonly style?: StyleProp<ViewStyle>;
	readonly placeholderTextColor?: ColorValue;
	readonly hintText?: string;
	readonly maxLength?: number | undefined;
	readonly multiline?: boolean;
	readonly selectionColor?: ColorValue;
	readonly textAlign?: "left" | "right" | "center";
	readonly textAlignVertical?: "auto" | "top" | "bottom" | "center";
	readonly onChange?: (
		e: NativeSyntheticEvent<TextInputChangeEventData>,
	) => void;
	readonly onChangeText?: (text: string) => void;
	readonly onFocus?:
	| ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
	| undefined;
	readonly errorText?: string | null;
	readonly error?: FieldError;
	readonly isPasswordTextFiled?: boolean;
	readonly keyboardType?: KeyboardTypeOptions;
	readonly lable?: string;
	readonly calenderIcon?: boolean;
	readonly onBlur?: (
		e: NativeSyntheticEvent<TextInputFocusEventData>,
	) => void;
	readonly isRtl?: boolean;
	readonly countryCode?: boolean;
};

const FormTextInput = ({
	style,
	placeholderTextColor = "grey",
	hintText,
	maxLength,
	multiline,
	selectionColor,

	onChange,
	onChangeText,
	onFocus,
	inputValue,
	error,
	errorText,
	isPasswordTextFiled,
	// ref,
	lable,
	keyboardType,
	onBlur,
	isRtl = false,
	countryCode = false,
	textAlignVertical,
}: TextInputProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordValidationMessage, setPasswordValidationMessage] = useState<
		string | null
	>(null);

	const { width } = useWindowDimensions();
	const OFFSET = 50;

	// Password validation function
	// const validatePassword = (text: string) => {
	//   const minLength = text.length >= 8;
	//   const hasUppercase = /[A-Z]/.test(text);
	//   const hasNumber = /[0-9]/.test(text);
	//   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);

	//   if (!minLength) {
	//     setPasswordValidationMessage('Password must be at least 8 characters.');
	//   } else if (!hasUppercase) {
	//     setPasswordValidationMessage(
	//       'Password must include at least one uppercase letter.',
	//     );
	//   } else if (!hasNumber) {
	//     setPasswordValidationMessage(
	//       'Password must include at least one number.',
	//     );
	//   } else if (!hasSpecialChar) {
	//     setPasswordValidationMessage(
	//       'Password must include at least one special character.',
	//     );
	//   } else {
	//     setPasswordValidationMessage(null);
	//   }
	// };

	const handlePasswordChange = (text: string) => {
		const sanitizedText = text.replace(/\s+/g, "");
		// if (isPasswordTextFiled) {
		//   // validatePassword(sanitizedText);
		// }
		if (onChangeText) {
			onChangeText(sanitizedText);
		}
	};

	return (
		<View style={{ gap: 5 }}>
			<View>
				{lable && (
					<View
						style={{
							marginVertical: 10,
							alignItems: isRtl ? "flex-end" : "flex-start",
							marginRight: 30,
						}}>
						<Text style={{ color: K.colorsConstants.grey }}>
							{lable}
						</Text>
					</View>
				)}

				<View
					style={[
						styles.container,
						{
							width: "100%",
							height: OFFSET,
							...(countryCode
								? {
									flexDirection: "row",
									alignItems: "center",
								}
								: undefined),
						},
						style,
					]}>
					{(!isRtl && countryCode) && <Text style={{ fontSize: 15, }}>+91</Text>}
					<TextInput
						// ref={ref}
						placeholderTextColor={placeholderTextColor || "#8E8E8E"}
						placeholder={hintText}
						maxLength={maxLength || 255}
						multiline={multiline}
						secureTextEntry={isPasswordTextFiled && !showPassword}
						// style={styles.textInputStyle}
						style={[
							styles.textInputStyle,
							multiline && { textAlignVertical: "top" },
							style,
						]}
						selectionColor={selectionColor}
						textAlign={isRtl ? "right" : "left"}
						// textAlign={textAlign}
						onChange={onChange}
						onChangeText={handlePasswordChange}
						onFocus={onFocus}
						value={inputValue}
						keyboardType={keyboardType}
						onBlur={onBlur}
						textAlignVertical={textAlignVertical}
					/>
					{(isRtl && countryCode) && (
						<View><Text style={{ fontSize: 15, }}> +91</Text></View>
					)}
					{isPasswordTextFiled && (
						<TouchableOpacity
							style={[
								styles.passwordIcon,
								{ alignSelf: isRtl ? "flex-start" : "flex-end" },
							]}
							onPress={() => setShowPassword(!showPassword)}>
							{!showPassword ? (
								<IcCloseEyeIcon />
							) : (
								<IcOpenEyeIcon />
							)}
						</TouchableOpacity>
					)}
				</View>
			</View>
			<View>
				{isPasswordTextFiled && passwordValidationMessage && (
					<Text style={styles.validationMessageStyle}>
						{passwordValidationMessage}
					</Text>
				)}
				{error && errorText ? (
					<View style={{
						flexDirection: isRtl ? "row-reverse" : 'row'
					}}>
						<View
							style={{
								flexDirection: "row",
								gap: 5,
								paddingHorizontal: 12,
								alignItems: "center",
								alignSelf: isRtl ? 'flex-end' : 'flex-start'
							}}>
							<IcErrorIcon />
							<Text
								style={styles.errorTextStyle}
								adjustsFontSizeToFit>
								{errorText}
							</Text>
						</View>
					</View>

				) : null}
			</View>
		</View>
	);
};

export default FormTextInput;

const styles = StyleSheet.create({
	container: {
		// borderColor: '#D2D2D2',
		justifyContent: "center",
		// padding: 8,
		backgroundColor: K.colorsConstants.white,
		// boxShadow:
		//   `inset  4px 4px 10px rgba(141, 160, 176, 1),
		//    inset -10px -10px 10px  rgba(255, 255, 255, 1)`,
		borderRadius: 30,
		// margin: 5,
		borderWidth: 0.3,

		paddingHorizontal: 15,
	},
	textInputStyle: {
		color: "black",
		height: 70,
		alignItems: "center",
		fontSize: 14,
		marginLeft: Platform.OS === "ios" ? 2 : 0,
		// backgroundColor:'yellow',
		flex: 1,
	},
	errorTextStyle: {
		color: "red",
		fontSize: K.fontSizeConstants.extraThin,
		// marginTop: 2,
	},
	validationMessageStyle: {
		color: "orange",
		fontSize: 14,
		marginTop: 2,
	},
	passwordIcon: {
		position: "absolute",
		paddingHorizontal: 15,
		// right: 25,
	},
});
