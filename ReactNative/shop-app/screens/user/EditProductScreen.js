import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();
	const prodId = props.navigation.getParam('productId');
	const editedProduct = useSelector((state) => state.products.userProducts.find((prod) => prod.id === prodId));
	const dispatch = useDispatch();

	const [ title, setTitle ] = useState(editedProduct ? editedProduct.title : '');
	const [ titleIsValid, setTitleIsValid ] = useState(false);
	const [ imageUrl, setImageUrl ] = useState(editedProduct ? editedProduct.imageUrl : '');
	const [ price, setPrice ] = useState('');
	const [ description, setDescription ] = useState(editedProduct ? editedProduct.description : '');

	const submitHandler = useCallback(
		async () => {
			if (!titleIsValid) {
				Alert.alert('Wrong Input!', 'Please check the errors in the form', [ { text: 'Okay' } ]);
				return;
			}
			setError(null);
			setIsLoading(true);
			try {
				if (editedProduct) {
					await dispatch(productsActions.updateProduct(prodId, title, description, imageUrl));
				} else {
					await dispatch(productsActions.createProduct(title, description, imageUrl, +price));
				}
			} catch (err) {
				setError(err.message);
			}
			setIsLoading(false);
			props.navigation.goBack();
		},
		[ dispatch, prodId, title, description, imageUrl, price, titleIsValid ]
	);

	useEffect(
		() => {
			props.navigation.setParams({ submit: submitHandler });
		},
		[ submitHandler ]
	);

	const titleChangeHandler = (text) => {
		if (text.trim().length > 0) {
			setTitleIsValid(false);
		} else {
			setTitleIsValid(true);
		}
		setTitle(text);
	};
	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={titleChangeHandler}
						keyboardType='default'
						autoCapitalize='sentences'
						autoCorrect
						returnKeyType='next'
					/>
					{!titleIsValid && <View>Please enter a valid title!</View>}
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Image URL</Text>
					<TextInput style={styles.input} value={imageUrl} onChangeText={(text) => setImageUrl(text)} />
				</View>
				{editedProduct ? null : (
					<View style={styles.formControl}>
						<Text style={styles.label}>Price</Text>
						<TextInput
							style={styles.input}
							value={price}
							onChangeText={(text) => setPrice(text)}
							keyboardType='decimal-pad'
						/>
					</View>
				)}
				<View style={styles.formControl}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={styles.input}
						value={description}
						onChangeText={(text) => setDescription(text)}
						multiline
					/>
				</View>
			</View>
		</ScrollView>
	);
};

EditProductScreen.navigationOptions = (navData) => {
	const submitFn = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Save'
					iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
					onPress={submitFn}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	form: {
		margin: 20
	},
	formControl: {
		width: '100%'
	},
	label: {
		fontFamily: 'open-sans-bold',
		marginVertical: 8
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	}
});

export default EditProductScreen;
