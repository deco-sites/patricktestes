import { signal, useSignal } from "@preact/signals";
import Icon from "deco-sites/patricktestes/components/ui/Icon.tsx";
import { invoke } from "deco-sites/patricktestes/runtime.ts";
import { total } from "deco-sites/patricktestes/sdk/useTotalVotes.ts";
import { useEffect } from "preact/hooks";

import Swal from "npm:sweetalert2@11.0.17";


export interface VoteButtonProps {
  productID: string;
}

// const total = signal(0);

function VoteButton({ productID }: VoteButtonProps) {
  const selected = useSignal(false);
  const quantity = useSignal(0);

  useEffect(() => {
    const updateTotals = async () => {
      const totalVotes = await invoke["deco-sites/patricktestes"].loaders
        .totalVotes();

      const totalVotesProduct = await invoke["deco-sites/patricktestes"].loaders
        .totalVotesProduct({ productID });

      total.value = totalVotes.total;
      quantity.value = totalVotesProduct.product;
    };

    updateTotals();
    setInterval(updateTotals, 30000);
  });

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    selected.value = true;

    await invoke["deco-sites/patricktestes"].actions.sendVotes({
      productID: productID,
    });

    const totalVotes = await invoke["deco-sites/patricktestes"].loaders
      .totalVotes();

    total.value = totalVotes.total;

    const totalVotesProduct = await invoke["deco-sites/patricktestes"].loaders
      .totalVotesProduct({ productID });

    quantity.value = totalVotesProduct.product;
    
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Obrigado por curtir este produto!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (

    <>
    {/* <ToastContainerComponent /> */}

    <button
      class="flex items-center justify-center gap-1 p-1 sm:p-2 rounded bg-neutral sm:bg-white min-w-14"
      onClick={(e) => handleClick(e)}
    >
      {!selected.value
        ? <Icon id="MoodSmile" width={24} height={24} />
        : <Icon id="MoodCheck" width={24} height={24} />}
      <span
        class={`min-w-4 text-center text-xs font-thin ${
          !selected.value ? "text-gray-500" : "text-black"
        }`}
      >
        {quantity.value}
      </span>
    </button>

    </>
    
  );
}

export default VoteButton;
