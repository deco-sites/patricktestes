import { signal, useSignal } from "@preact/signals";
import Icon from "deco-sites/patricktestes/components/ui/Icon.tsx";
import { invoke } from "deco-sites/patricktestes/runtime.ts";
import { total } from "deco-sites/patricktestes/sdk/useTotalVotes.ts";
import { useEffect } from "preact/hooks";
import { Flip, toast } from "react-toastify";
import { sendEvent } from "../sdk/analytics.tsx";

export interface VoteButtonProps {
  productID: string;
}

// const total = signal(0);
function VoteButtonIsland({ productID }: VoteButtonProps) {
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

    sendEvent({
      name: "post_score",
      params: {
        score: total,
        // level: 5,
        // character: productID,
      },
    });

    toast.success("Obrigado por curtir este produto!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Flip,
    });

    
  };

  return (
    <>
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

export default VoteButtonIsland;
