import ReactLoading from "react-loading";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import useInfiniteScroll from "../../utils/hooks/useInfiniteScroll";
import useProducts from "../../utils/hooks/useProducts";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

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

  // new state
  const [isLogin, setIsLogin] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [likeAmount, setLikeAmount] = useState(900);
  const [dislikeAmount, setDislikeAmount] = useState(20);

  const likeHandler = () => {
    if (!isLike && !isDislike) {
      setIsLike(true);
      setLikeAmount(likeAmount + 1);
    }

    if (isLike && !isDislike) {
      setIsLike(false);
      setLikeAmount(likeAmount - 1);
    }

    if (isLike && isDislike) {
      setIsLike(false);
      setLikeAmount(likeAmount - 1);
      setDislikeAmount(dislikeAmount - 1);
    }

    if (!isLike && isDislike) {
      setIsLike(true);
      setIsDislike(false);
      setLikeAmount(likeAmount + 1);
      setDislikeAmount(dislikeAmount - 1);
    }
  };
  const dislikeHandler = () => {
    if (!isLike && !isDislike) {
      setIsDislike(true);
      setDislikeAmount(dislikeAmount + 1);
    }

    if (!isLike && isDislike) {
      setIsDislike(false);
      setDislikeAmount(dislikeAmount - 1);
    }

    if (isLike && isDislike) {
      setIsDislike(false);
      setDislikeAmount(dislikeAmount - 1);
      setLikeAmount(likeAmount - 1);
    }

    if (isLike && !isDislike) {
      setIsDislike(true);
      setIsLike(false);
      setDislikeAmount(dislikeAmount + 1);
      setLikeAmount(likeAmount - 1);
    }
  };

  return (
    <Wrapper>
      {products.map(({ id, main_image, colors, title, price }) => (
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
            <div className="flex gap-3">
              <button
                className="bg-gray-100 h-6 px-2 flex items-center gap-3 rounded-md hover:bg-gray-200"
                title="我喜歡"
                onClick={likeHandler}
              >
                {isLike ? (
                  <AiFillLike className="w-5 h-5" fill="#3f3a3a" />
                ) : (
                  <AiOutlineLike className="w-4 h-4" />
                )}

                {likeAmount}
              </button>
              <button
                className="bg-gray-100 h-6 px-2 flex items-center gap-3 rounded-md hover:bg-gray-200"
                title="我不喜歡"
                onClick={dislikeHandler}
              >
                {isDislike ? (
                  <AiFillDislike className="w-5 h-5" fill="#3f3a3a" />
                ) : (
                  <AiOutlineDislike />
                )}
                {dislikeAmount}
              </button>
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
