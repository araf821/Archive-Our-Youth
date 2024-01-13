import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MoreVertical } from "lucide-react";

interface UserDropdownProps {}

const UserDropdown = ({}: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="">
          <MoreVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px] space-y-1.5 border-2 border-zinc-700"
        align="end"
      >
        <DropdownMenuItem className="justify-center">
          <button className="w-full cursor-pointer tracking-widest focus-visible:outline-zinc-500">
            More Information
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center">
          <button className="w-full cursor-pointer tracking-widest">
            Manage User
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
