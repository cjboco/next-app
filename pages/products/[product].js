import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Page from '../../Components/styled/Page';


const Title = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const SubTitle = styled.p`
  padding: 0.75rem 0.5rem;
  color: #777;
`;

const Price = styled.span`
  display: inline-block;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background: #e2afc1;
  color: white;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Product = ({ product: { data, content } }) => {
	const html = marked(content);
	return (
		<Page>
			<Title>
				<h1>{data.name}</h1>
				<SubTitle>{data.description}</SubTitle>
			</Title>
			<Price>${data.price / 100}</Price>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</Page>
	);
};

export const getStaticPaths = () => {
	// product page to generte
	const directory = `${process.cwd()}/content`;
	const filenames = fs.readdirSync(directory);

	const paths = filenames.map((filename) => {
		return {
			params: {
				product: filename.replace(".md", ""),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async (context) => {
	const productName = context.params.product;
	const filepath = `${process.cwd()}/content/${productName}.md`;
	const fileContent = fs.readFileSync(filepath).toString();
	const { data, content } = matter(fileContent);
	return {
		props: {
			product: {
				data,
				content,
			},
		},
	};
};

export default Product;
