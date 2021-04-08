import { createContext, useState, useEffect } from 'react'


export const Context = createContext();

const Cart = ({ children }) => {
	const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
	const [cart, setCart] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [totalQty, setTotalQty] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	const openCart = () => {
		setIsOpen(true);
	}

	const closeCart = () => {
		setIsOpen(false);
	}

	useEffect(() => {
		const initialCart = getInitialCart();
		if (initialCart) {
			setCart(initialCart);

			// set the initial totals
			let qty = 0;
			let price = 0;

			initialCart.map(item => {
				qty += item.qty;
				price += item.price * item.qty
			})

			setTotalQty(qty);
			setTotalPrice(price);
		}
	}, []);

	useEffect(() => {
		// write to local storage
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addItemToCart = (product, qty = 1) => {
		const item = cart.find((i) => i.id === product.id);

		if (item) {
			item.qty += qty;
			setCart([...cart]);
		} else {
			setCart([...cart, { ...product, qty }]);
		}

		// update totals
		setTotalPrice(totalPrice + (product.price * qty))
		setTotalQty(totalQty + qty);
	};

	const removeItemFromCart = (id) => {
		const item = cart.find((i) => i.id === product.id);
		const newCart = cart.filter((item) => {
			return item.id != id;
		});

		// update totals
		if (item) {
			setTotalPrice(totalPrice + (item.price * item.qty))
			setTotalQty(totalQty - item.qty);
		}

		setCart(newCart);
	};

	const clearCart = () => {
		localStorage.removeItem("cart");
		setCart([]);
	}

	const exposed = {
		cart,
		addItemToCart,
		removeItemFromCart,
		openCart,
		closeCart,
		isOpen,
		totalPrice,
		totalQty,
		clearCart
	};

	return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export default Cart