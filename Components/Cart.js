import styled from "styled-components";
import { FiX } from "react-icons/fi";
import useCart from "../hooks/useCart";
import { useRouter } from 'next/router'

const Container = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	width: 300px;
	min-height: 100vh;
	background-color: white;
	box-shadow: 0 0 29px rgba(0,0,0,0.15);
	transform: translateX(${props => props.isOpen ? '0' : '100%'});
	transition: transform 0.2s ease-in;
`;

const XContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const X = styled(FiX)`
	font-size: 3rem;

	&:hover {
		cursor: pointer;
	}
`;

const Content = styled.div`
	padding: 1rem 2rem;
`;

const Title = styled.h2`
	font-size: 2.5rem;
	font-weight: 400;
	border-bottom: 1px solid #efefef;
`;

const Ul = styled.ul`
	list-style: none;
	margin: 1rem 0;
	padding: 0;
`;

const Item = styled.li`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #efefef;
	margin-bottom: 0.25rem;
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
`;

const Cart = () => {
	const { cart, isOpen, openCart, closeCart, totalPrice, totalQty } = useCart();
	const router = useRouter();

	const handleClick = () => {
		closeCart();
	}

	const navigateToCheckout = () => {
		closeCart();
		router.push('/checkout')
	}

	return (
		<Container isOpen={isOpen}>
			<XContainer>
				<X onClick={handleClick} />
			</XContainer>
			<Content>
				<Title>Cart</Title>
				{cart.length ? (
					<>
						<Ul>
							{cart.map(item => {
								return <Item key={item.id}>
									<span>{item.qty}x {item.name}</span>
									<span>${item.price * item.qty / 100}</span>
								</Item>
							})}
						</Ul>
						<Total>
							<span>Total</span>
							<span>${totalPrice / 100}</span>
						</Total>
						<Button onClick={navigateToCheckout}>Checkout</Button>
					</>
				) : (
					<p>Cart is empty</p>
				)}
			</Content>
		</Container>
	);
}

export default Cart;