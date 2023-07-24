import {twMerge} from "tailwind-merge";
import TextareaAutosize from "react-textarea-autosize";

const getSharedClasses = () => {
  return twMerge(
    "text-left px-4 w-full h-10 outline-0 rounded-md rounded-r-none border-gray-200 border-2 p-2 font-semibold"
  )
}

export default function Input(props: React.PropsWithChildren<{
  maxLen?: number,
  maxNum?: number,
  minNum?: number,
  minLen?: number,
  type?: string,
  step?: number,
  placeholder?: string,
  className?: string,
  value?: string | number,
  onChange?: (val: string) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void,
  readonly?: boolean,

  loading?: boolean,
  label?: string,
  error?: string | null,

  autosize?: boolean
  wrapped?: boolean,
  minRows?: number,

  disabled?: boolean
}>) {

  const sharedProps = {
    maxLength: props.maxLen,
    readOnly: props.readonly || undefined,
    minLength: props.minLen,
    value: props.value,
    placeholder: props.placeholder,
    onKeyDown: props.onKeyDown,
    disabled: props.disabled,
    step: props.step,

    className: twMerge(
      getSharedClasses(),
      props.autosize && "max-h-[90vh] resize-none",
      props.className),

    onChange: (e: any) => {
      e.preventDefault();
      props.onChange && props.onChange(e.target.value)
    },
  }
  return (
    <div className={"flex flex-col gap-2 w-full"}>
      {props.label && <label className={"text-left text-brand-800 mb-1"}>{props.label}</label>}
      <div className={"flex flex-row"}>
        {
          props.autosize
            ? <TextareaAutosize {...sharedProps} minRows={props.minRows || 1}/>
            : <input
              {...sharedProps}
              max={props.maxNum}
              min={props.minNum}
              type={props.type || "text"}/>
        }
        {props.children}
      </div>
      {props.error && <p className="text-sm text-red-500">{props.error}</p>}
    </div>
  );
}