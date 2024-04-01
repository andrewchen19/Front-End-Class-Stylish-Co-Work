import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button';
import { AuthContext } from '../../context/authContext';
import { CartContext } from '../../context/cartContext';
import api from '../../utils/api';
import tappay from '../../utils/tappay';
import Cart from './Cart';

import yellowCoin from '../../assets/coin_get.png';

//component
import CouponsModal from './CouponsModal';
import { BackDrop } from './CouponsModal';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 47px 0 263px;
  max-width: 1160px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    padding: 20px 24px 236px;
  }
`;

const GrayBlock = styled.div`
  padding: 22px 60px;
  margin-top: 26px;
  background-color: #e8e8e8;
  color: #3f3a3a;
  /* display: flex;
  flex-direction: column; */
  line-height: 19px;
  font-size: 16px;

  @media screen and (max-width: 1279px) {
    padding: 10px 10px 20px;
    /* align-items: flex-start; */
    font-size: 14px;
    line-height: 17px;
  }
`;

const Label = styled.label`
  /* color: #3f3a3a; */
  /* margin-left: 30px;

  @media screen and (max-width: 1279px) {
    margin-left: 0;
  } */
`;

const Select = styled.select`
  width: 171px;
  height: 30px;
  padding-left: 17px;
  border-radius: 8px;
  border: solid 1px #979797;
  background-color: #f3f3f3;

  & + ${Label} {
    @media screen and (max-width: 1279px) {
      margin-left: 0;
      margin-top: 20px;
    }
  }

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
`;

const DeliveryAndPayContainer = styled.div`
  width: 660px;
  display: flex;
  gap: 82px;
  margin-top: 5px;
`;

const DeliveryWrapper = styled.div`
  width: 285px;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const PaymentWrapper = styled.div`
  width: 285px;
  align-items: center;
  display: flex;
  gap: 20px;
`;

const Note = styled.div`
  line-height: 26px;
  margin-top: 20px;
  font-size: 16px;
  color: #3f3a3a;
`;

const FormFieldSet = styled.fieldset`
  margin-top: 50px;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;

const FormLegend = styled.legend`
  line-height: 19px;
  font-size: 16px;
  font-weight: bold;
  color: #3f3a3a;
  padding-bottom: 16px;
  border-bottom: 1px solid #3f3a3a;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 684px;

  ${FormLegend} + & {
    margin-top: 25px;
  }

  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    margin-top: 20px;
    width: 100%;

    ${FormLegend} + & {
      margin-top: 20px;
    }
  }
`;

const FormLabel = styled.label`
  width: 110px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const FormControl = styled.input`
  width: 574px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px ${({ invalid }) => (invalid ? '#CB4042' : '#979797')};

  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
  }
`;

const FormText = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #8b572a;
  margin-top: 10px;
  width: 100%;
  text-align: right;
`;

const FormCheck = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;

  & + & {
    margin-left: 30px;
  }

  @media screen and (max-width: 1279px) {
    margin-left: 0;
    margin-top: 10px;

    & + & {
      margin-left: 27px;
    }
  }
`;

const FormCheckInput = styled.input`
  margin: 0;
  width: 16px;
  height: 16px;
`;

const FormCheckLabel = styled.label`
  margin-left: 10px;
  line-height: 26px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  margin-left: auto;

  @media screen and (max-width: 1279px) {
    width: 200px;
  }
`;

const SubtotalPrice = styled(Price)`
  margin-top: 40px;

  @media screen and (max-width: 1279px) {
    margin-top: 24px;
  }
`;

const ShippingPrice = styled(Price)`
  margin-top: 20px;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;
const DiscountPrice = styled(Price)`
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #3f3a3a;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
    padding-bottom: 24px;
    border-bottom: 1px solid #3f3a3a;
  }
`;

const TotalPrice = styled(Price)`
  margin-top: 20px;

  @media screen and (max-width: 1279px) {
    margin-top: 16px;
  }
`;

const PriceName = styled.div`
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
  }
`;

const Currency = styled.div`
  margin-left: auto;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
`;

const PriceValue = styled.div`
  line-height: 36px;
  margin-left: 10px;
  font-size: 30px;
  color: #3f3a3a;
`;

const formInputs = [
  {
    label: '收件人姓名',
    key: 'name',
    text: '務必填寫完整收件人姓名，避免包裹無法順利簽收',
  },
  { label: 'Email', key: 'email' },
  { label: '手機', key: 'phone' },
  { label: '地址', key: 'address' },
];

const timeOptions = [
  {
    label: '08:00-12:00',
    value: 'morning',
  },
  {
    label: '14:00-18:00',
    value: 'afternoon',
  },
  {
    label: '不指定',
    value: 'anytime',
  },
];

const DiscountWrapper = styled.div`
  width: 660px;
  display: flex;
  gap: 82px;
`;

const CouponSelect = styled.div`
  width: 285px;
  display: flex;
  align-items: center;
  gap: 20px;
  .selection {
    &:hover {
      color: #8b572a;
      cursor: pointer;
    }
  }
`;

const CoinUseSelect = styled.div`
  width: 285px;
  display: flex;
  align-items: center;
`;

function Checkout() {
  // ↓ co-work adjustment
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [discount, setDiscount] = useState({
    coupon_id: '',
    type: 'FIXED',
    discount_value: 0,
  });

  const [paymentDiscount, setPaymentDiscount] = useState(0);

  const [discountContext, setDiscountContext] = useState('結帳折抵 0 元');

  const [allCoupons, setAllCoupons] = useState([]);

  useEffect(() => {
    const allCouponsUrl =
      'http://34.29.92.215:5000/api/1.1/user/available-coupons'; //待修改
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJSb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcxMTg1NzU4OCwiZXhwIjoxNzEyNzIxNTg4fQ.Xsqx9VNXmqCvJOxaJ9s-7n-6_vCQIGrKCuHCo4mvkabeQlFsdNQUnF1f_XwsVB3_eWKOWCbYAYB2vX1ciZzsDg';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    async function getCoupons(url, headers) {
      const response = await fetch(url, { headers });
      const couponsData = await response.json();
      setAllCoupons(couponsData);
    }
    getCoupons(allCouponsUrl, headers);
  }, []);

  // ↑ co-work adjustment
  const [recipient, setRecipient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    time: '',
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cardNumberRef = useRef();
  const cardExpirationDateRef = useRef();
  const cardCCVRef = useRef();
  const formRef = useRef();

  const { jwtToken, isLogin, login } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const setupTappay = async () => {
      await tappay.setupSDK();
      tappay.setupCard(
        cardNumberRef.current,
        cardExpirationDateRef.current,
        cardCCVRef.current
      );
    };
    setupTappay();
  }, []);

  const subtotal = cartItems.reduce(
    (prev, item) => prev + item.price * item.qty,
    0
  );
  useEffect(() => {
    const paymentDiscount =
      discount.type === 'FIXED'
        ? discount.discount_value
        : Math.floor(
            ((10 - discount.discount_value) / 10) * (subtotal + freight)
          );
    setPaymentDiscount(paymentDiscount);
  }, [discount, subtotal]);

  const freight = 30;

  async function checkout() {
    try {
      setLoading(true);

      const token = isLogin ? jwtToken : await login();

      if (!token) {
        window.alert('請登入會員');
        return;
      }

      if (cartItems.length === 0) {
        window.alert('尚未選購商品');
        return;
      }

      if (Object.values(recipient).some((value) => !value)) {
        window.alert('請填寫完整訂購資料');
        setInvalidFields(
          Object.keys(recipient).filter((key) => !recipient[key])
        );
        formRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return;
      }

      if (!tappay.canGetPrime()) {
        window.alert('付款資料輸入有誤');
        return;
      }

      const result = await tappay.getPrime();
      if (result.status !== 0) {
        window.alert('付款資料輸入有誤');
        return;
      }

      const { data } = await api.checkout(
        {
          prime: result.card.prime,
          order: {
            shipping: 'delivery',
            payment: 'credit_card',
            subtotal,
            freight,
            total: subtotal + freight,
            recipient,
            list: cartItems,
          },
        },
        token
      );
      window.alert('付款成功');
      setCartItems([]);
      navigate('/thankyou', { state: { orderNumber: data.number } });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    // ↓ co-work adjustment
    <Wrapper>
      {isModalOpen && allCoupons && (
        <>
          <BackDrop
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
          <CouponsModal
            allCoupons={allCoupons}
            onSubmit={setDiscount}
            setDiscountContext={setDiscountContext}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        </>
      )}

      <Cart />
      <GrayBlock>
        <DiscountWrapper>
          <CouponSelect onClick={() => setIsModalOpen(true)}>
            <p className="selection">選擇優惠券</p>
            <p className="text-[18px]">{discountContext}</p>
          </CouponSelect>

          <CoinUseSelect>
            <p>使用</p>
            <img className="w-[40px]" src={yellowCoin} alt="use_tokens" />
            <p>幣折抵</p>
          </CoinUseSelect>
        </DiscountWrapper>
        {/* ↑ co-work adjustment */}

        <DeliveryAndPayContainer>
          <DeliveryWrapper>
            <Label>配送國家</Label>
            <Select>
              <option>臺灣及離島</option>
            </Select>
          </DeliveryWrapper>
          <PaymentWrapper>
            <Label>付款方式</Label>
            <Select>
              <option>信用卡付款</option>
            </Select>
          </PaymentWrapper>
        </DeliveryAndPayContainer>
      </GrayBlock>
      <Note>
        ※ 提醒您：
        <br />● 選擇宅配-請填寫正確收件人資訊，避免包裹配送不達
        <br />● 選擇超商-請填寫正確收件人姓名(與證件相符)，避免無法領取
      </Note>
      <form ref={formRef}>
        <FormFieldSet>
          <FormLegend>訂購資料</FormLegend>
          {formInputs.map((input) => (
            <FormGroup key={input.key}>
              <FormLabel>{input.label}</FormLabel>
              <FormControl
                value={recipient[input.key]}
                onChange={(e) =>
                  setRecipient({ ...recipient, [input.key]: e.target.value })
                }
                invalid={invalidFields.includes(input.key)}
              />
              {input.text && <FormText>{input.text}</FormText>}
            </FormGroup>
          ))}
          <FormGroup>
            <FormLabel>配送時間</FormLabel>
            {timeOptions.map((option) => (
              <FormCheck key={option.value}>
                <FormCheckInput
                  type="radio"
                  checked={recipient.time === option.value}
                  onChange={(e) => {
                    if (e.target.checked)
                      setRecipient({ ...recipient, time: option.value });
                  }}
                />
                <FormCheckLabel>{option.label}</FormCheckLabel>
              </FormCheck>
            ))}
          </FormGroup>
        </FormFieldSet>
        <FormFieldSet>
          <FormLegend>付款資料</FormLegend>
          <FormGroup>
            <FormLabel>信用卡號碼</FormLabel>
            <FormControl as="div" ref={cardNumberRef} />
          </FormGroup>
          <FormGroup>
            <FormLabel>有效期限</FormLabel>
            <FormControl as="div" ref={cardExpirationDateRef} />
          </FormGroup>
          <FormGroup>
            <FormLabel>安全碼</FormLabel>
            <FormControl as="div" ref={cardCCVRef} />
          </FormGroup>
        </FormFieldSet>
      </form>
      <SubtotalPrice>
        <PriceName>總金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{subtotal}</PriceValue>
      </SubtotalPrice>
      <ShippingPrice>
        <PriceName>運費</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{freight}</PriceValue>
      </ShippingPrice>
      <DiscountPrice>
        <PriceName>折扣金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{paymentDiscount}</PriceValue>
      </DiscountPrice>
      <TotalPrice>
        <PriceName>應付金額</PriceName>
        <Currency>NT.</Currency>
        <PriceValue>{subtotal + freight - paymentDiscount}</PriceValue>
      </TotalPrice>
      <Button loading={loading} onClick={checkout}>
        確認付款
      </Button>
    </Wrapper>
  );
}

export default Checkout;
