import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";
import Link from "next/link";

export type ButtonStyle = "default" | "outline" | "none";
export type ButtonRoundness = "medium" | "full";

export function createButtonComponent(Element: any, isLink: boolean) {
  return function Button(props: PropsWithChildren<{
    style?: ButtonStyle,
    href?: string,
    roundness?: ButtonRoundness,
    disabled?: boolean,
    className?: string,
    type?: string,
    onClick?: () => void
  }>) {
    const styles = getStyles(props.style ?? "default");
    const disabledStyle = props.disabled ? "opacity-80 pointer-events-none" : "";
    const roundStyle = getRoundStyle(props.roundness ?? "full");

    return (
      <Element href={props.href} onClick={props.onClick} disabled={props.disabled} type={props.type} className={
        twMerge(
          "px-3 py-2 text-base font-semibold duration-150",
          isLink && "flex items-center justify-center button-link",
          styles,
          roundStyle,
          props.className,
          disabledStyle
        )
      }>
        {props.children}
      </Element>
    )
  }
}

export const ButtonLink = createButtonComponent(Link, true);
export default createButtonComponent("button", false);

function getStyles(style: ButtonStyle) {
  switch (style) {
    case "outline":
      return "border-[3px] border-brand-800 text-brand-800 rounded-lg bg-white hover:bg-emerald-50/50";
    case "none":
      return "";
    default:
      return "bg-brand-800 text-white rounded hover:bg-brand-800/90";
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