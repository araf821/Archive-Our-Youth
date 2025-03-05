import { FC } from "react";
import { X } from "lucide-react";
import { navLinks } from "./NavLinks";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useMenu } from "@/hooks/useMenu";
import { kobata } from "@/app/fonts";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/hooks/useModal";
import { useTranslations } from "next-intl";

interface MobileMenuProps {}

// Enhanced animations with staggered children
const sidebarVariants = {
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0, 0.55, 0.45, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Improved button animations
const buttonVariants = {
  hidden: {
    x: -60,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  const { isOpen, onClose } = useMenu();
  const { onOpen } = useModal();
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const { signOut, openSignIn } = useClerk();
  const t = useTranslations("Navigation");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={sidebarVariants}
          className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-background-muted to-background-muted/95 px-8 backdrop-blur-md sm:px-16 md:px-24 lg:hidden"
        >
          <div className="flex justify-end pb-4 pt-16">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-zinc-800/50 p-3 text-zinc-300 transition hover:bg-zinc-700/50 hover:text-white"
              onClick={onClose}
            >
              <span className="sr-only">close menu button</span>
              <X className="sm:h-7 sm:w-7 md:h-8 md:w-8" />
            </motion.button>
          </div>

          <motion.ul className="flex w-full flex-1 flex-col gap-8 overflow-y-auto pb-12 pt-8">
            <motion.li variants={buttonVariants} className="list-none">
              <motion.button
                whileHover={{ x: 10, color: "#4ade80" }}
                onClick={() => {
                  if (!userId) {
                    onClose();
                    return onOpen("submitAuthModal");
                  }
                  onClose();
                  router.push("/submit");
                }}
                className={cn(
                  "w-fit text-2xl font-light transition-all duration-300",
                  pathname === "/submit" ? "text-green-500" : "text-zinc-100",
                )}
              >
                <span className="relative">
                  Submit A Post
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-green-500 to-green-300"
                    initial={{ scaleX: pathname === "/submit" ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.button>
            </motion.li>

            {navLinks.map((link, index) => (
              <motion.li
                variants={buttonVariants}
                className="list-none"
                key={link.label}
              >
                <motion.button
                  whileHover={{ x: 10, color: "#4ade80" }}
                  onClick={() => {
                    onClose();
                    router.push(link.pathname);
                  }}
                  className={cn(
                    "w-fit text-2xl font-light transition-all duration-300",
                    pathname === link.pathname
                      ? "text-green-500"
                      : "text-zinc-100",
                  )}
                >
                  <span className="relative capitalize">
                    {t(link.label)}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-green-500 to-green-300"
                      initial={{ scaleX: pathname === link.pathname ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.button>
              </motion.li>
            ))}

            <motion.li variants={buttonVariants} className="list-none">
              {userId ? (
                <motion.button
                  whileHover={{ x: 10, color: "#4ade80" }}
                  onClick={() =>
                    signOut(() => {
                      onClose();
                      router.push("/home");
                    })
                  }
                  className="w-fit text-2xl font-light text-zinc-100 transition-all duration-300"
                >
                  <span className="relative">
                    Sign Out
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-green-500 to-green-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ x: 10, color: "#4ade80" }}
                  onClick={() => {
                    onClose();
                    openSignIn({
                      appearance: {
                        elements: { modalContent: { paddingTop: 20 } },
                      },
                    });
                  }}
                  className="w-fit text-2xl font-light text-zinc-100 transition-all duration-300"
                >
                  <span className="relative">
                    Sign In
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-green-500 to-green-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.button>
              )}
            </motion.li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pb-8"
          >
            <p
              className={`${kobata.className} bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-2xl text-transparent`}
            >
              Archive Our Youth
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
