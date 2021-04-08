import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Navbar from "../Components/Navbar";
import CartProvider from '../context/Cart';
import Cart from '../Components/Cart';

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap");
  background: linear-gradient(to right, #ff6e7f, #bfe9ff);
  font-family: Padauk, sans-serif;
  color: #444;
  height: 100vh;
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const MyApp = ({ Component, pageProps }) => {
	return (
		<CartProvider>
			<Container>
				<Normalize />
				<Navbar />
				<Page>
					<Component {...pageProps} />
				</Page>
				<Cart />
			</Container>
		</CartProvider>
	);
};

export default MyApp;
