import Page from '../Components/styled/Page';
import useCart from "../hooks/useCart";
import styled from "styled-components";
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";

const Ul = styled.ul`
	list-style: none;
	margin: 1rem 0;
	padding: 0;
`;

const Item = styled.li`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #efefef;
	margin-bottom: 1rem;
`;

const Total = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: 600;
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

const Button = styled.button`
	background: linear-gradient(to right, #ff6e7f, #bfe9ff);;
	outline: none;
	border: none;
	font-size: 2rem;
	width: 100%;
	padding: 1rem;
	color: white;

	&:hover {
		cursor: pointer;
	}

	&:active {
		background: #ff6e7f;
	}
`;

const Checkout = () => {
	const { cart, totalPrice } = useCart();

	const processPayment = async () => {
		const url = '/.netlify/functions/charge-card';
		const newCart = cart.map(({ id, qty }) => ({
			id,
			qty
		}))
		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
		const { data } = await axios.post(url, { cart: newCart });
		await stripe.redirectToCheckout({ sessionId: data.id });
	}

	return <Page>
		<h2>Checkout</h2>
		{cart.length ? (
			<>
				<Ul>
					{cart.map(item => {
						return <Item key={item.id}>
							<span>{item.qty}x {item.name} @ ${item.price / 100}</span>
							<span>${item.price * item.qty / 100}</span>
						</Item>
					})}
				</Ul>
				<Total>
					<span>Total</span>
					<span>${totalPrice / 100}</span>
				</Total>
				<Button onClick={processPayment}>Process Payment</Button>
			</>
		) : (
			<p>You do not appear to have any items in your cart!</p>
		)}
	</Page>
}

export default Checkout;