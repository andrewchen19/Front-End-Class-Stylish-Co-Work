import { useEffect, useState, useRef } from 'react';
import left from '/src/assets/left.png';
import right from '/src/assets/right.png';
import leftHover from '/src/assets/left_hover.png';
import rightHover from '/src/assets/right_hover.png';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';

const Carousel = () => {
  const { user } = useGlobalContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;
    const token = user.accessToken;
    const allProductsUrl = 'https://34.29.92.215/api/1.1/user/view/history';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    async function getProducts(url, headers) {
      const response = await fetch(url, { headers });
      const data = await response.json();
      setProducts(data);
    }
    getProducts(allProductsUrl, headers);
  }, [user]);

  const slideRef = useRef(null);

  const [moveDistance, setMoveDistance] = useState(0);

  useEffect(() => {
    slideRef.current.style.transform = `translateX(${moveDistance}px)`;
  }, [moveDistance]);

  //for arrow function
  const [isLeftSlideDisabled, setIsLeftSlideDisabled] = useState();
  const [isRightSlideDisabled, setIsRightSlideDisabled] = useState();

  const [isLeftArrowHover, setIsLeftArrowHover] = useState(false);
  const [isRightArrowHover, setRightArrowHover] = useState(false);

  useEffect(() => {
    moveDistance === 0
      ? setIsLeftSlideDisabled(true)
      : setIsLeftSlideDisabled(false);
    moveDistance <= (products.length - viewAmount) * -imgWithGapWidth + gap
      ? setIsRightSlideDisabled(true)
      : setIsRightSlideDisabled(false);
  }, [moveDistance, products]);

  if (!products) return null;
  const gap = 33;
  const imgWidth = 200;
  const viewAmount = 4;
  const imgWithGapWidth = imgWidth + gap;

  const handleCarouselSlide = (direction) => {
    if (
      direction === 'right' &&
      moveDistance > (products.length - viewAmount) * -imgWithGapWidth + gap
    ) {
      setMoveDistance((prev) => (prev -= imgWithGapWidth));
    } else if (direction === 'left' && moveDistance < 0) {
      setMoveDistance((prev) => (prev += imgWithGapWidth));
    }
  };

  const handleMouseEnter = (direction) => {
    direction === 'left' ? setIsLeftArrowHover(true) : setRightArrowHover(true);
  };

  const handleMouseLeave = (direction) => {
    direction === 'left'
      ? setIsLeftArrowHover(false)
      : setRightArrowHover(false);
  };

  const handleReRenderCarousel = () => {
    const token = user.accessToken;
    const allProductsUrl = 'https://34.29.92.215/api/1.1/user/view/history';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    async function getProducts(url, headers) {
      const response = await fetch(url, { headers });
      const data = await response.json();
      setProducts(data);
    }
    getProducts(allProductsUrl, headers);
  };
  return (
    <section className="w-[960px] h-[380px] flex items-center justify-center relative">
      <div
        className={`w-[40px] mr-3 rounded-[50%] bg-white absolute z-10 left-0.5 hover:cursor-pointer ${
          isLeftSlideDisabled ? 'hidden' : ''
        }`}
        onClick={() => handleCarouselSlide('left')}
        onMouseEnter={() => handleMouseEnter('left')}
        onMouseLeave={() => handleMouseLeave('left')}
      >
        <img
          src={left}
          alt="next_product_history"
          className={isLeftArrowHover ? 'hidden' : 'inline-block'}
        />
        <img
          src={leftHover}
          alt="next_product_history"
          className={isLeftArrowHover ? 'inline-block' : 'hidden'}
        />
      </div>

      <div className="carousel overflow-hidden h-[350px] w-[900px] rounded-2xl relative  bg-gray-100 ">
        <div
          ref={slideRef}
          className={`container flex gap-[33px] duration-700 ease-in-out`}
        >
          {products.map((product, index) => (
            <Link
              key={index}
              to={`/products/${product.product_id}`}
              onClick={handleReRenderCarousel}
            >
              <div className={`content w-[${imgWidth}px] flex-shrink-0 mt-6 `}>
                <img
                  className="w-[200px]"
                  src={'https://3.225.61.15/' + product.url}
                  alt=""
                />
                <h3 className="ml-2 mt-3">{product.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`w-[40px] mr-3 rounded-[50%] bg-white absolute z-10 right-0.5 hover:cursor-pointer ${
          isRightSlideDisabled ? 'hidden' : ''
        }`}
        onClick={() => handleCarouselSlide('right')}
        onMouseEnter={() => handleMouseEnter('right')}
        onMouseLeave={() => handleMouseLeave('right')}
      >
        <img
          src={right}
          alt="previous_product_history"
          className={isRightArrowHover ? 'hidden' : 'inline-block'}
        />
        <img
          src={rightHover}
          alt="previous_product_history"
          className={isRightArrowHover ? 'inline-block' : 'hidden'}
        />
      </div>
    </section>
  );
};

export default Carousel;
