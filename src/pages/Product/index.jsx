import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/api";
import ProductVariants from "./ProductVariants";
import Carousel from "./Carousel";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/globalContext";
import axios from "axios";

import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 65px 0 49px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

const MainImage = styled.img`
  width: 560px;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const Details = styled.div`
  margin-left: 42px;
  flex-grow: 1;

  @media screen and (max-width: 1279px) {
    margin: 17px 24px 0;
  }
`;

const Title = styled.div`
  line-height: 38px;
  font-size: 32px;
  letter-spacing: 6.4px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    font-size: 20px;
    letter-spacing: 4px;
  }
`;

const ID = styled.div`
  line-height: 24px;
  margin-top: 16px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #bababa;

  @media screen and (max-width: 1279px) {
    line-height: 19px;
    margin-top: 10px;
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;

const Price = styled.div`
  line-height: 36px;
  margin-top: 40px;
  font-size: 30px;
  color: #3f3a3a;
  padding-bottom: 20px;
  border-bottom: 1px solid #3f3a3a;

  position: relative;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    margin-top: 20px;
    font-size: 20px;
    padding-bottom: 10px;
  }
`;

const Detail = styled.div`
  line-height: 30px;
  font-size: 20px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    font-size: 14px;
  }
`;

const Note = styled(Detail)`
  margin-top: 40px;

  @media screen and (max-width: 1279px) {
    margin-top: 28px;
  }
`;

const Texture = styled(Detail)`
  margin-top: 30px;

  @media screen and (max-width: 1279px) {
    margin-top: 24px;
  }
`;

const Description = styled(Detail)`
  white-space: pre;
`;

const Place = styled(Detail)`
  ${Description} + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 24px;
    }
  }
`;

const Story = styled.div`
  margin: 50px 0 0;
  width: 100%;

  @media screen and (max-width: 1279px) {
    margin: 28px 24px 0;
  }
`;

const StoryTitle = styled.div`
  line-height: 30px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #8b572a;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: 3.2px;
  }

  &::after {
    content: "";
    height: 1px;
    flex-grow: 1;
    background-color: #3f3a3a;
    margin-left: 64px;

    @media screen and (max-width: 1279px) {
      margin-left: 35px;
    }
  }
`;

const StoryContent = styled.div`
  line-height: 30px;
  margin-top: 28px;
  font-size: 20px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 25px;
    margin-top: 12px;
    font-size: 14px;
  }
`;

const Images = styled.div`
  margin: 30px 0 0;

  @media screen and (max-width: 1279px) {
    margin: 20px 24px 0;
    width: 100%;
  }
`;

const Image = styled.img`
  @media screen and (max-width: 1279px) {
    width: 100%;
  }

  & + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 20px;
    }
  }
`;

function Product() {
  const [product, setProduct] = useState();
  const { id } = useParams();

  const { user } = useGlobalContext();

  // new state
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [value, setValue] = useState("");
  const [likeAmount, setLikeAmount] = useState(0);
  const [dislikeAmount, setDislikeAmount] = useState(0);

  useEffect(() => {
    const url = `https://3.225.61.15/api/1.0/products/details?id=${id}`;
    const token = user ? user.accessToken : "";
    let response;

    async function getProduct() {
      if (token) {
        response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setProduct(response.data.data);
        setLikeAmount(response.data.rating.goodCounts);
        setDislikeAmount(response.data.rating.badCounts);
        if (response.data.userRate === "good") {
          setIsLike(true);
        } else if (response.data.userRate === "bad") {
          setIsDislike(true);
        }
      } else {
        response = await axios.get(url);
        setProduct(response.data.data);
        setLikeAmount(response.data.rating.goodCounts);
        setDislikeAmount(response.data.rating.badCounts);
      }
    }
    getProduct();
  }, [id]);

  useEffect(() => {
    if (!value) return;
    console.log(value);

    const token = user ? user.accessToken : "";

    const delayedFunction = async () => {
      const url = `https://34.29.92.215/api/1.1/user/rating`;

      try {
        const response = await axios.post(
          url,
          {
            product_id: id,
            rating: value,
            comment: "",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        // token expired or missing
        console.log(error);
        toast.error("Token Missing or Invalid. Please Login Again");
      }
    };

    const timeoutId = setTimeout(delayedFunction, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  if (!product) return null;

  const likeHandler = () => {
    const addLike = !isLike && !isDislike;
    const cancelLike = isLike && !isDislike;
    const addLikeAndCancelDislike = !isLike && isDislike;

    if (!user) {
      toast.error("Please log in first 😬");
      return;
    }

    if (addLike) {
      setIsLike(true);
      setLikeAmount(likeAmount + 1);
      setValue("good");
    }

    if (cancelLike) {
      setIsLike(false);
      setLikeAmount(likeAmount - 1);
      setValue("nothing");
    }

    if (addLikeAndCancelDislike) {
      setIsLike(true);
      setIsDislike(false);
      setLikeAmount(likeAmount + 1);
      setDislikeAmount(dislikeAmount - 1);
      setValue("good");
    }
  };
  const dislikeHandler = () => {
    const addDislike = !isLike && !isDislike;
    const cancelDislike = !isLike && isDislike;
    const addDislikeAndCancelLike = isLike && !isDislike;

    if (!user) {
      toast.error("Please log in first 😬");
      return;
    }

    if (addDislike) {
      setIsDislike(true);
      setDislikeAmount(dislikeAmount + 1);
      setValue("bad");
    }

    if (cancelDislike) {
      setIsDislike(false);
      setDislikeAmount(dislikeAmount - 1);
      setValue("nothing");
    }

    if (addDislikeAndCancelLike) {
      setIsDislike(true);
      setIsLike(false);
      setDislikeAmount(dislikeAmount + 1);
      setLikeAmount(likeAmount - 1);
      setValue("bad");
    }
  };
  const amountTransform = (amount) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount;
  };

  return (
    <Wrapper>
      <MainImage src={product.main_image} />
      <Details>
        <Title>{product.title}</Title>
        <ID>{product.id}</ID>
        <Price>
          TWD.{product.price}
          <button
            className="absolute bottom-[20px] right-[80px] bg-gray-100 h-6 px-2 flex items-center gap-2 rounded-md hover:bg-gray-200 font-normal text-base"
            title="我喜歡"
            onClick={() => likeHandler(product.id)}
          >
            {isLike ? (
              <AiFillLike className="w-5 h-5" fill="#3f3a3a" />
            ) : (
              <AiOutlineLike className="w-4 h-4" />
            )}

            {amountTransform(likeAmount)}
          </button>
          <button
            className="absolute bottom-[20px] right-0 bg-gray-100 h-6 px-2 flex items-center gap-2 rounded-md hover:bg-gray-200 font-normal text-base"
            title="我不喜歡"
            onClick={() => dislikeHandler(product.id)}
          >
            {isDislike ? (
              <AiFillDislike className="w-5 h-5" fill="#3f3a3a" />
            ) : (
              <AiOutlineDislike className="w-4 h-4" />
            )}
            {amountTransform(dislikeAmount)}
          </button>
        </Price>

        <ProductVariants product={product} />
        <Note>{product.note}</Note>
        <Texture>{product.texture}</Texture>
        <Description>{product.description}</Description>
        <Place>素材產地 / {product.place}</Place>
        <Place>加工產地 / {product.place}</Place>
      </Details>
      <Story>
        <StoryTitle>細部說明</StoryTitle>
        <StoryContent>{product.story}</StoryContent>
      </Story>
      <Images>
        {product.images.map((image, index) => (
          <Image src={image} key={index} />
        ))}
      </Images>
      {user && (
        <>
          <Story>
            <StoryTitle>再逛一次</StoryTitle>
          </Story>
          <Carousel />
        </>
      )}
    </Wrapper>
  );
}

export default Product;
