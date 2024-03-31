import discount_percent from '../../assets/discountPercentage.png';
import discount_cash from '../../assets/discountCash.png';
import { useState, useEffect } from 'react';

//components
import CloseButton from './CloseButton';

export const BackDrop = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[800] bg-black bg-opacity-75"></div>
  );
};

const CouponsModal = ({ onClose, onSubmit, setDiscount }) => {
  const [couponsState, setCouponsState] = useState();

  useEffect(() => {
    const updatedSelectedState = couponsSorted.map((coupon) => ({
      ...coupon,
      isSelected: false,
    }));
    setCouponsState(updatedSelectedState);
  }, []);

  // useEffect(() => {
  //   couponsState && console.log(couponsState);
  // }, [couponsState]);
  const couponsData = [
    {
      coupon_id: 0,
      discount_value: 0.2,
      expiration_date: '2025/12/31',
      type: 'PERCENT',
    },
    {
      coupon_id: 1,
      discount_value: 50.0,
      expiration_date: '2025/12/31',
      type: 'FIXED',
    },
    {
      coupon_id: 2,
      discount_value: 0.1,
      expiration_date: '2025/12/31',
      type: 'PERCENT',
    },
  ];

  const couponsFixed = couponsData.filter((coupon) => coupon.type === 'FIXED');
  const couponsPercent = couponsData.filter(
    (coupon) => coupon.type === 'PERCENT'
  );
  const couponsSorted = [...couponsFixed, ...couponsPercent];

  const handleSelectCoupon = (index, type) => {
    setCouponsState((prevState) =>
      prevState.map((coupon, i) => {
        if (i === index && coupon.type === type) {
          return { ...coupon, isSelected: true };
        }
        return { ...coupon, isSelected: false };
      })
    );
  };
  const handleUseCoupon = () => {
    setDiscountContext();
    onClose();
    const discountState = setDiscountState();
    onSubmit(discountState);
  };

  const setDiscountContext = () => {
    const selectedCoupon = couponsState.find(
      (coupon) => coupon.isSelected === true
    );
    const selectedCoupon_type = selectedCoupon.type;
    const selectedCoupon_discountValue = selectedCoupon.discount_value;
    let discountContext = '';
    selectedCoupon_type === 'FIXED'
      ? (discountContext = `結帳折抵 ${selectedCoupon_discountValue} 元`)
      : (discountContext = `結帳折扣 ${
          (1 - selectedCoupon_discountValue) * 10
        } 折`);

    setDiscount(discountContext);
  };

  const setDiscountState = () => {
    const type = couponsState.find((coupon) => coupon.isSelected).type;
    const discount_value = couponsState.find(
      (coupon) => coupon.isSelected
    ).discount_value;
    if (type === 'FIXED') {
      return { type, discount_value };
    } else {
      return { type, discount_value: (1 - discount_value) * 10 };
    }
  };
  return (
    <>
      <div className="wrapper w-[500px] h-[500px] px-11 pt-[40px] left-1/2 translate-x-[-50%] translate-y-[-20%] bg-white fixed z-[1000] border-black border border-solid">
        <div className="box_background w-[200px] h-[60px] bg-white flex items-center justify-center text-2xl absolute left-[10px] top-[15px]">
          <h2>請選擇優惠券</h2>
        </div>
        <CloseButton onClose={onClose} />

        <div className="dashed_lines_decoration h-[410px] border-black border-2 border-dashed p-11 flex flex-col items-center justify-start ">
          <div className="inner_wrapper h-[350px] overflow-y-scroll overflow-x-hidden">
            {couponsState &&
              couponsState
                .filter((coupon) => coupon.type === 'FIXED')
                .map((coupon, index) => (
                  <div
                    key={coupon.coupon_id}
                    className={`couponContainer flex m-3 hover:cursor-pointer ${
                      coupon.isSelected
                        ? 'border-2 border-yellow-700 border-solid rounded-lg shadow-xl transform scale-105'
                        : ''
                    } transition duration-[80] ease-in-out`}
                    onClick={() => handleSelectCoupon(index, coupon.type)}
                  >
                    <div className="coupon_left_icon w-[100px] h-[100px] bg-[#f5f5f5] flex items-center justify-center rounded-l-lg">
                      <img
                        src={discount_cash}
                        alt="discount for cash"
                        className="w-10"
                      />
                    </div>
                    <div className="coupon_right_content w-[250px] h-[100px] bg-[#e4e4e4] rounded-r-lg">
                      <div className="content_wrapper flex flex-col gap-[27px] relative">
                        <div className="coupon_title bg-[#f5f5f5] w-[180px] h-[35px] rounded-lg mt-[8px] self-center flex items-center justify-center  ">
                          <span>
                            {`結帳商品折抵${Math.floor(
                              coupon.discount_value
                            )}元`}
                          </span>
                        </div>
                        <p className="expiration relative left-[40px] text-[14px]">
                          {`失效日期：${coupon.expiration_date}`}
                        </p>
                        <div className="circle_decoration w-[15px] h-[15px] rounded-[45%] absolute right-[10px] top-[43px] bg-white"></div>
                      </div>
                    </div>
                  </div>
                ))}

            {couponsState &&
              couponsState
                .filter((coupon) => coupon.type === 'PERCENT')
                .map((coupon, index) => (
                  <div
                    key={coupon.coupon_id}
                    className={`couponContainer flex m-3 hover:cursor-pointer ${
                      coupon.isSelected
                        ? 'border-2 border-yellow-700 border-solid rounded-lg shadow-xl transform scale-105'
                        : ''
                    } transition duration-[80] ease-in-out`}
                    onClick={() =>
                      handleSelectCoupon(
                        index +
                          couponsState.filter(
                            (coupon) => coupon.type === 'FIXED'
                          ).length,
                        coupon.type
                      )
                    }
                  >
                    <div className="coupon_left_icon w-[100px] h-[100px] bg-[#e4e4e4] flex items-center justify-center rounded-l-lg">
                      <img
                        src={discount_percent}
                        alt="discount for cash"
                        className="w-10"
                      />
                    </div>

                    <div className="coupon_right_content w-[250px] h-[100px] bg-[#f5f5f5] rounded-r-lg">
                      <div className="content_wrapper flex flex-col gap-[27px] relative">
                        <div className="coupon_title bg-[#e4e4e4] w-[180px] h-[35px] rounded-lg mt-[8px] self-center flex items-center justify-center  ">
                          <span>
                            {`結帳商品 ${(1 - coupon.discount_value) * 10} 折`}
                          </span>
                        </div>
                        <p className="expiration relative left-[40px] text-[14px]">
                          {`失效日期：${coupon.expiration_date}`}
                        </p>
                        <div className="circle_decoration w-[15px] h-[15px] rounded-[45%] absolute right-[10px] top-[43px] bg-white"></div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="box_background w-[150px] h-[70px] bg-[white] flex items-center justify-center absolute right-4 bottom-6">
          <div
            className="button w-[116px] h-[50px] bg-secondary flex justify-center items-center rounded-lg hover:cursor-pointer active:bg-yellow-900"
            onClick={handleUseCoupon}
          >
            <span className="text-white text-[22px]">使用</span>
          </div>
        </div>
      </div>
    </>
  );
};
{
  /* <img src={discount_percent} alt="discount for percentage-off" /> */
}
export default CouponsModal;
