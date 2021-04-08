import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import styled from "styled-components";
import UnstyledLink from "../Components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: white;
  padding: 1rem 2rem;
  min-height: 200px;
  transition: all 0.15s linear;

  &:hover,
  &:active {
    transform: scale(1.02);
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
`;

const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Price = styled.div`
  text-align: right;
  font-size: 2rem;
`;

const renderProduct = (product, addItemToCart) => {
	const handleClick = (e) => {
		e.stopPropagation();
		addItemToCart(product);
	};

	return (
		<Link href={product.slug} key={product.id}>
			<UnstyledLink>
				<Container>
					<h1>{product.name}</h1>
					<p>{product.description}</p>
					<ActionContainer>
						<button onClick={handleClick}>Add to cart</button>
						<Price>${product.price / 100}</Price>
					</ActionContainer>
				</Container>
			</UnstyledLink>
		</Link>
	);
};
const HomePage = (props) => {
	const { cart, addItemToCart } = useCart();
	return (
		<ProductsContainer>
			{props.products.map((product) => renderProduct(product, addItemToCart))}
		</ProductsContainer>
	);
};

export const getStaticProps = async () => {
	const directory = `${process.cwd()}/content`;
	const filenames = fs.readdirSync(directory);

	const products = filenames.map((filename) => {
		// read the file from fs
		const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
		// pull out frontmatter => name
		const { data } = matter(fileContent);
		const slug = `/products/${filename.replace(".md", "")}`;
		const product = {
			...data,
			slug,
		};
		// return the name, slug
		return product;
	});

	return {
		props: {
			products,
		},
	};
};
export default HomePage;
