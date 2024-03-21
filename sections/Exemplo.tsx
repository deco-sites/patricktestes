export interface Props {
  description?: string;
}

const Exemplo = ({ description }: Props) => {
  return (
    <div class="coupon-container text-center">
      {description}
    </div>
  );
};

export default Exemplo;
