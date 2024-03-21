export interface Props {
  description?: string;
  code?: string;
}

const Coupon = ({ description, code }: Props) => {
  return (
    <div class="coupon-container text-center">
      <div class="coupon-description  lg:text-3xl">
        <span>{description}</span>
      </div>
      <div class="coupon-code text-center mt-10 mb-10">
        <span class="text-center border border-dashed border-2 border-sky-500 p-2">
          {code}
        </span>
      </div>
    </div>
  );
};

export default Coupon;
