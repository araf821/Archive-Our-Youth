import { FC } from "react";
import { X } from "lucide-react";
import { navLinks } from "./NavLinks";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useMenu } from "@/hooks/useMenu";
import { kobata } from "@/app/fonts";
import { motion, stagger } from "framer-motion";
import { useModal } from "@/hooks/useModal";
interface MobileMenuProps {}

const sidebarVariants = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: {
      delay: 0.5,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    duration: 0.3,
  },
};

const buttonVariants = (index: number) => ({
  hidden: {
    x: -250,
    transition: {
      delay: 0.1 * index,
      duration: 0.1,
    },
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.15 + 0.1 * (index + 1),
      duration: 0.1,
    },
  },
});

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  const { isOpen, onClose } = useMenu();
  const { onOpen } = useModal();
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const { signOut, openSignIn } = useClerk();

  return (
    <motion.div
      initial={false}
      variants={sidebarVariants}
      animate={isOpen ? "show" : "hidden"}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-zinc-900 px-12 sm:px-20 md:px-28 lg:hidden",
        {
          "pointer-events-none": !isOpen,
        },
      )}
    >
      <div className="pb-4 pt-16">
        <button
          className="text-zinc-300 transition hover:scale-110 hover:text-white active:scale-90"
          onClick={onClose}
        >
          <span className="sr-only">close menu button</span>
          <X className="sm:h-8 sm:w-8 md:h-10 md:w-10" />
        </button>
      </div>
      <motion.ul
        animate
        className="flex w-full flex-1 flex-col gap-8 overflow-y-auto pb-12 pt-12"
      >
        <motion.li
          variants={buttonVariants(0)}
          animate={isOpen ? "show" : "hidden"}
          className="list-none"
        >
          <button
            onClick={() => {
              if (!userId) {
                onClose();
                return onOpen("submitAuthModal");
              }
              onClose();
              router.push("/submit");
            }}
            className={cn(
              "w-fit text-3xl font-light text-zinc-100 transition-all hover:tracking-[4px] hover:text-white",
              {
                "text-green-500 hover:text-green-500": pathname === "/submit",
              },
            )}
          >
            Submit A Post
          </button>
        </motion.li>
        {navLinks.map((link, index) => (
          <motion.li
            variants={buttonVariants(index + 1)}
            animate={isOpen ? "show" : "hidden"}
            className="list-none"
            key={link.label}
          >
            <button
              onClick={() => {
                onClose();
                router.push(link.pathname);
              }}
              className={cn(
                "w-fit text-3xl font-light text-zinc-100 transition-all hover:tracking-[4px] hover:text-white",
                {
                  "text-green-500 hover:text-green-500":
                    pathname === link.pathname,
                },
              )}
            >
              {link.label}
            </button>
          </motion.li>
        ))}
        <motion.li
          variants={buttonVariants(4)}
          animate={isOpen ? "show" : "hidden"}
          className="list-none"
        >
          {userId ? (
            <button
              onClick={() =>
                signOut(() => {
                  onClose();
                  router.push("/home");
                })
              }
              className="w-fit text-3xl font-light text-zinc-100 transition-all hover:tracking-[4px] hover:text-white"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                openSignIn({
                  appearance: {
                    elements: { modalContent: { paddingTop: 20 } },
                  },
                });
              }}
              className="w-fit text-3xl font-light text-zinc-100 transition-all hover:tracking-[4px] hover:text-white"
            >
              Sign In
            </button>
          )}
        </motion.li>
      </motion.ul>
      <p className={`${kobata.className} pb-8 text-2xl text-white`}>
        Archive Our Youth
      </p>
    </motion.div>
    // <Sheet>
    //   <SheetTrigger asChild>
    //     <button className="">
    //       <Menu className="h-6 w-6 md:h-6 md:w-6" />
    //     </button>
    //   </SheetTrigger>
    //   <SheetContent
    //     className="flex h-full flex-col gap-4 overflow-y-auto bg-zinc-900 p-0"
    //     side="right"
    //   >
    //     <div className="flex items-center justify-between bg-gradient-to-tr from-red-600 to-rose-500 p-6 pb-6 shadow-[0_2px_10px] shadow-red-500/50 md:text-lg">
    //       <Link href="/" className={`${kobata.className} text-xl text-white`}>
    //         Archive Our Youth
    //       </Link>
    //       <SheetClose className="text-white">
    //         <X />
    //       </SheetClose>
    //     </div>

    //     <div className="flex h-full flex-col justify-between rounded-full px-4 pb-4 tracking-wider text-zinc-50">
    //       <div
    //         onClick={() => close()}
    //         className="flex flex-col items-center gap-4"
    //       >
    //         <Link
    //           href="/submit"
    //           className="w-full rounded-sm bg-white py-2.5 text-center text-lg font-semibold text-black shadow-md shadow-white/50 transition hover:bg-rose-500 hover:shadow-rose-500/50"
    //         >
    //           Submit A Post
    //         </Link>
    //         <hr className="w-full border-zinc-800" />
    //         {navLinks.map((link) => (
    //           <Link
    //             key={link.pathname}
    //             href={link.pathname}
    //             className={cn(
    //               "w-full rounded-sm py-2 text-center text-xl transition hover:bg-rose-300/10",
    //               {
    //                 "bg-gradient-to-tr from-rose-600 to-red-400 text-black shadow-[0_0_20px_2px] shadow-red-500/40 hover:cursor-default":
    //                   pathname === link.pathname,
    //               },
    //             )}
    //           >
    //             <SheetClose className="w-full">{link.label}</SheetClose>
    //           </Link>
    //         ))}
    //       </div>
    //       {userId ? (
    //         <button
    //           onClick={() => {
    //             signOut();
    //             toast.success("Signed Out");
    //           }}
    //           className="mt-8 w-full bg-zinc-800 py-3 transition hover:bg-zinc-700"
    //         >
    //           <SheetClose className="w-full">Sign Out</SheetClose>
    //         </button>
    //       ) : (
    //         <button
    //           onClick={() => openSignIn()}
    //           className="mt-8 w-full bg-zinc-800 py-3 transition hover:bg-zinc-700"
    //         >
    //           <SheetClose className="w-full">Sign In</SheetClose>
    //         </button>
    //       )}
    //     </div>
    //   </SheetContent>
    // </Sheet>
  );
};

export default MobileMenu;
