import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

export type ButtonStyle = "default" | "outline";
export type ButtonRoundness = "medium" | "full";
// default: green background, white text, rounded.
// outline: green border, green text, white background, rounded.

export default function Button(props: PropsWithChildren<{ style?: ButtonStyle, roundness?: ButtonRoundness, className?: string }>) {
  const style = getStyle(props.style ?? "default");
  const roundStyle = getRoundStyle(props.roundness ?? "full");

  return (
    <button className={twMerge("px-3 py-1 text-base font-semibold", style, roundStyle, props.className)}>
      {props.children}
    </button>
  )
}

function getStyle(style: ButtonStyle) {
  switch (style) {
    case "outline":
      return "border-[3px] border-brand-800 text-brand-800 rounded-lg bg-white";
    default:
      return "bg-brand-800 text-white rounded";
  }
}

function getRoundStyle(roundness: ButtonRoundness) {
  switch (roundness) {
    case "medium":
      return "rounded";
    case "full":
    default:
      return "rounded-full";
  }
}