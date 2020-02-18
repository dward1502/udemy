import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../store/actions/products.actions';

const EditProductsScreen = (props) => {
	const prodId = props.navigation.getParam('productId');
	const editedProduct = useSelector((state) => state.products.userPorducts.find((prod) => prod.id === prodId));

	const [ title, setTitle ] = useState(editedProduct ? editedProduct.title : '');
	const [ imageUrl, setImageUrl ] = useState(editedProduct ? editedProduct.imageUrl : '');
	const [ price, setPrice ] = useState('');
	const [ description, setDescription ] = useState(editedProduct ? editedProduct.description : '');
  const dispatch = useDispatch();

	const submitHandler = useCallback(
		() => {
			if (editedProduct) {
				dispatch(productActions.updateProduct(prodId, title, description, imageUrl));
			} else {
				dispatch(productActions.createProduct(title, description, imageUrl, +price));
      }
      props.navigation.goBack();
		},
		[ dispatch, prodId, title, description, imageUrl, price ]
	);

	useEffect(
		() => {
			props.navigation.setParams({ submit: submitHandler });
		},
		[ submitHandler ]
	);

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label} value={imageUrl} onChangeText={(text) => setImageUrl(text)}>
						ImageURl
					</Text>
					<TextInput style={styles.input} />
				</View>

				{editedProduct ? null : (
					<View style={styles.formControl}>
						<Text style={styles.label} value={price} onChangeText={(text) => setPrice(text)}>
							Price
						</Text>
						<TextInput style={styles.input} />
					</View>
				)}
				<View style={styles.formControl}>
					<Text style={styles.label} value={description} onChangeText={(text) => setDescription(text)}>
						Description
					</Text>
					<TextInput style={styles.input} />
				</View>
			</View>
		</ScrollView>
	);
};

EditProductsScreen.navigationOptions = (navData) => {
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
		borderBottomColor: '#ccc'
	}
});
export default EditProductsScreen;
