export interface Props {
  description?: string;
  code?: string;
}

const Coupon = ({ description, code }: Props) => {
  return (
    <div class="coupon-container">
      <div class="coupon-code">
        <span>{description}</span>
      </div>
      <div class="coupon-description">
        <p>{code}</p>
      </div>
    </div>
  );
};

export default Coupon;
