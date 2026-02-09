import { Button } from "./ui/button";
import {CopyIcon,TrashIcon} from "@phosphor-icons/react"
interface LinkProps {
  edit: () => void;
  deleteItem: () => void;
  open: () => void;
  data: {
    id: string;
    link: string;
    short: string;
    access: string;
  };
}

export function LinkContainer({ data, deleteItem, edit,open }: LinkProps) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between p-4 bg-white border-border-default rounded-sm">
        <div className="flex flex-col items-start">
          <button
            onClick={open}
            className="flex text-2xl font-bold text-blue-base hover:text-blue-dark cursor-pointer"
          >
            {data.short}
          </button>

          <span className="text-text-secondary font-semibold">{data.link}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-text-secondary font-semibold">
            acessado {data.access}
          </span>

          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={edit}>
              <CopyIcon size={32} />
            </Button>

            <Button variant="delete" onClick={deleteItem}>
              <TrashIcon size={32} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
