import { Input } from "./ui/input";

interface inputProps extends React.ComponentProps<"input">{
    label: string,
}

export const InputUI = ({label,...props}:inputProps) => {
  return (
    <div className="gap-2 flex flex-col focus-within:text-blue-base">
      <label htmlFor="original">
        {label}
      </label>
      <Input
        id="original"
        className="p-3 rounded-sm border border-border-default focus:border-blue-base placeholder:text-gray-400 text-gray-600"
        {...props}
      />
    </div>
  );
};
