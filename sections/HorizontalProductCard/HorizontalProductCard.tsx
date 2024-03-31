import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  description?: string;
  price?: string;
  image?: ImageWidget;
  animateImage: boolean;
}

export function ErrorFallback(error: Error) {
  return (
    <div className="w-full max-w-5xl flex sm:flex-col md:flex-row items-start md:items-center gap-6 my-12 p-6 rounded-xl mt-2 bg-zinc-200 mx-auto">
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <img
          src="/image/produto-teste2.png"
          alt="Cultura da Loja"
          className="w-48 md:w-48"
        />
      </div>
      <div className="w-full md:w-2/3 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-gray-900 font-bold">Cultura da Loja</h2>
          <p className="mt-2 text-gray-600 text-sm line-clamp-1 md:line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus mollitia architecto vel obcaecati nisi libero
            voluptatem nesciunt.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <a href="/culturas">
            <button className="bg-black text-white border font-bold p-2 rounded h-7 btn no-animatio mt-4 md:mt-0">
              para saber mais
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div>
      <h2>carregando...</h2>
      <span class="loading loading-spinner" />
    </div>
  );
}

export default function HorizontalProductCard(
  { title, description, price, image, animateImage }: Props,
) {
  if (!title || !description || !price || !image) {
    return ErrorFallback(new Error("Sem produtos para renderizar"));
  }

  return (
    <div className="w-full max-w-5xl flex sm:flex-col md:flex-row items-start md:items-center gap-6 my-12 p-6 rounded-xl mt-2 bg-zinc-200 mx-auto">
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`w-48 md:w-48 duration-300 ${
            animateImage ? "hover:scale-110" : ""
          }`}
        />
      </div>

      <div className="w-full md:w-2/3 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-gray-900 font-bold">{title}</h2>
          <p className="mt-2 text-gray-600 text-sm line-clamp-1 md:line-clamp-3">
            {description}
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <span className="text-gray-900 font-bold text-center text-xl">
            {price}
          </span>
          <button className="bg-black text-white border font-bold p-2 rounded h-7 btn no-animatio mt-4 md:mt-0">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
