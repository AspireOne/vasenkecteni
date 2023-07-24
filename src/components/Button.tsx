import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

export type ButtonStyle = "default" | "outline";
export type ButtonRoundness = "medium" | "full";
// default: green background, white text, rounded.
// outline: green border, green text, white background, rounded.

export default function Button(props: PropsWithChildren<{
  style?: ButtonStyle,
  roundness?: ButtonRoundness,
  disabled?: boolean,
  className?: string,
  onClick?: () => void
}>) {
  const style = getStyle(props.style ?? "default");
  const disabledStyle = props.disabled ? "opacity-80 pointer-events-none" : "";
  const roundStyle = getRoundStyle(props.roundness ?? "full");

  return (
    <button onClick={props.onClick} disabled={props.disabled} className={
      twMerge(
        "px-3 py-2 text-base font-semibold",
        style,
        roundStyle,
        props.className,
        disabledStyle
        )
    }>
      {props.children}
    </button>
  )
}

function getStyle(style: ButtonStyle) {
  switch (style) {
    case "outline":
      return "border-[3px] border-brand-800 text-brand-800 rounded-lg bg-white";
    default:
      return "bg-brand-800 text-white rounded duration-150 hover:bg-brand-800/90";
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