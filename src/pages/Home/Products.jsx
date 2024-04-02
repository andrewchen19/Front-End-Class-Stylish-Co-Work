import ReactLoading from "react-loading";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import useInfiniteScroll from "../../utils/hooks/useInfiniteScroll";
import useProducts from "../../utils/hooks/useProducts";
import { AiFillLike } from "react-icons/ai";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 0 46px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1279px) {
    padding: 15px 21px 6px;
  }
`;

const Product = styled.div`
  width: calc((100% - 120px) / 3);
  margin: 0 20px 50px;
  flex-shrink: 0;
  text-decoration: none;

  @media screen and (max-width: 1279px) {
    width: calc((100% - 12px) / 2);
    margin: 0 3px 24px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  vertical-align: middle;
`;

const ProductColors = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 1279px) {
    margin-top: 8px;
  }
`;

const ProductColor = styled.div`
  width: 24px;
  height: 24px;
  box-shadow: 0px 0px 1px #bbbbbb;
  background-color: ${(props) => props.$colorCode};

  @media screen and (max-width: 1279px) {
    width: 12px;
    height: 12px;
  }

  & + & {
    margin-left: 10px;

    @media screen and (max-width: 1279px) {
      margin-left: 6px;
    }
  }
`;

const ProductTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;
  line-height: 24px;

  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    font-size: 12px;
    letter-spacing: 2.4px;
    line-height: 14px;
  }
`;

const ProductPrice = styled.div`
  margin-top: 10px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;
  line-height: 24px;

  @media screen and (max-width: 1279px) {
    margin-top: 8px;
    font-size: 12px;
    letter-spacing: 2.4px;
    line-height: 14px;
  }
`;

const Loading = styled(ReactLoading)`
  margin: 0 auto;
`;

function Products() {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category") || "all";

  const { products, loadMoreProducts, isLoading } = useProducts({
    keyword,
    category,
  });
  useInfiniteScroll(loadMoreProducts);

  const [fakeLikeList, setFakeLikeList] = useState([]);

  useEffect(() => {
    if (category === "all") {
      setFakeLikeList([60, 55, 43, 43, 50, 63]);
    }
    if (category === "women") {
      setFakeLikeList([46, 46, 43, 43, 50, 50]);
    }
    if (category === "men") {
      setFakeLikeList([48, 1, 50]);
    }
    if (category === "accessories") {
      setFakeLikeList([60, 55, 63, 0]);
    }
  }, [category]);

  const amountTransform = (amount) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount;
  };

  return (
    <Wrapper>
      {products.map(({ id, main_image, colors, title, price }, index) => (
        <Product key={id}>
          <Link to={`/products/${id}`}>
            <ProductImage src={main_image} />
          </Link>
          <ProductColors>
            <div className="flex">
              {colors.map(({ code }) => (
                <ProductColor $colorCode={`#${code}`} key={code} />
              ))}
            </div>
            <div className="absolute right-0 flex items-center">
              <AiFillLike fill="#3f3a3a" className="text-[20px] leading-6" />
              <p className="pl-3 font-medium text-primary">
                {amountTransform(fakeLikeList[index])}
              </p>
            </div>
          </ProductColors>
          <ProductTitle>{title}</ProductTitle>
          <ProductPrice>TWD.{price}</ProductPrice>
        </Product>
      ))}
      {isLoading && <Loading type="spinningBubbles" color="#313538" />}
    </Wrapper>
  );
}

export default Products;
