import { useState, useEffect } from "react";
import { motion, usePresence, AnimatePresence } from "framer-motion";
import Color from "color";
import { faker } from "@faker-js/faker";
import parse from "html-react-parser";
import Link from "next/link";
import {} from "@heroicons/react/24/solid";
import Image from "next/image";

const name = () => `${faker.name.firstName()} ${faker.name.lastName()}`;
const initialState = ["loading"];

const listText = [
  {
    id: "1",
    title: "Hi👋, I'm Angga Nur Prasetya",
    content: `I work as a <span className="font-bold">Mobile & Web Developer</span> I am ready to support your app with 2+ years of experience.`,
  },
  {
    id: "2",
    title: "What am I doing now?",
    content:
      "Freelance Web Developer and Remote Full-stack Developer at PT Traspac Makmur Sejahtera",
  },
  {
    id: "3",
    title: "See a sample of my work",
    listContent: [""],
  },
  {
    id: "4",
    title: "Get in touch",
  },
];

export default function App() {
  const [items, setItems] = useState(initialState);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      const interval = setInterval(() => {
        if (items.length < listText.length) {
          const temp = [...items];
          temp[items.length + 1] = name();
          setItems([
            ...items.filter((it) => it !== "loading"),
            listText[items.length - 1],
            "loading",
          ]);
        } else if (items.length === listText.length) {
          const temp = [...items.filter((name) => name != "loading")];
          setItems([...temp]);
          setTimeout(() => {
            setItems([...temp, listText[listText.length - 1]]);
          }, 900);
          setFirstLoad(false);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [items]);

  return (
    <div className={`flex items-center justify-center h-screen w-screen`}>
      <div
        className={`flex h-[700px] w-full px-5 flex-row items-center justify-center `}
      >
        <div className={`h-full flex justify-end flex-col`}>
          <div className={`w-[70px] h-[70px] relative`}>
            <Image
              src="https://avatars3.githubusercontent.com/u/35420062?v=4"
              fill
              className="rounded-full"
            />
          </div>
        </div>
        <div
          className={`h-full flex justify-end flex-col overflow-y-hidden overflow-x-hidden px-5 gap-y-3`}
        >
          <AnimatePresence>
            {[...items].map((item, i) => (
              <ListItem key={item}>
                {item == "loading" ? (
                  <div className="w-[300px] flex flex-col items-start justify-center">
                    <div
                      className={`px-2 items-center  break-all justify-center flex flex-row py-3 border-2 border-gray-200 w-[70px]
     gap-x-[2px] rounded-xl`}
                    >
                      <div
                        className={`bg-gray-400  w-2 h-2 rounded-full animate-bounce blue-circle`}
                      ></div>
                      <div
                        className={`bg-gray-400 w-2 h-2 rounded-full animate-bounce green-circle`}
                      ></div>
                      <div
                        className={`bg-gray-400 w-2 h-2 rounded-full animate-bounce red-circle`}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`px-4 py-2 border-2 border-gray-200 break-words w-[300px] ${
                      i == items.length - 1
                        ? "rounded-tl-sm rounded-bl-xl"
                        : "rounded-tl-xl rounded-bl-sm"
                    }  rounded-tr-xl rounded-br-xl `}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold mb-2">
                        {parse(item.title)}
                      </span>
                      {item && item.content && (
                        <span>
                          {item && item.content ? parse(item.content) : ""}
                        </span>
                      )}
                      {item && item.id == "3" && (
                        <div className="flex flex-row gap-x-2">
                          <Link
                            target="_blank"
                            href="https://angganurprasetya.dev/detail_open_project/ipod"
                            className="cursor-pointer"
                          >
                            <div className={`w-[80px] h-[80px] relative`}>
                              <Image
                                src="https://angganurprasetya.dev/img/ipod.png"
                                fill
                                className="rounded-lg"
                              />
                            </div>
                          </Link>
                          <Link
                            target="_blank"
                            href="https://angganurprasetya.dev/detail_professional_project/tandhur"
                            className="cursor-pointer"
                          >
                            <div className={`w-[80px] h-[80px] relative`}>
                              <Image
                                src="https://angganurprasetya.dev/img/tandhur.png"
                                fill
                                className="rounded-lg"
                              />
                            </div>
                          </Link>
                          <Link
                            target="_blank"
                            className="cursor-pointer"
                            href="https://angganurprasetya.dev"
                          >
                            <div className="w-[80px] h-[80px] rounded-lg bg-gray-200 text-sm  flex flex-col justify-center items-center">
                              <span className="text-sm">5+</span>
                              <span className="text-xs">Show all</span>
                            </div>
                          </Link>
                        </div>
                      )}

                      {item && item.id == "4" && (
                        <div className="flex flex-row items-center gap-x-2">
                          <Link
                            target="_blank"
                            href="https://github.com/prasetyanurangga"
                            className="p-2 rounded-xl bg-gray-200 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </Link>
                          <Link
                            target="_blank"
                            href="https://www.linkedin.com/in/angga-nur-prasetya-936687180/"
                            className="p-2 rounded-xl bg-gray-200 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                            </svg>
                          </Link>
                          <Link
                            href="mailto:angganurprasetya4@gmail.com"
                            target="_blank"
                            className="p-2 rounded-xl bg-gray-200 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </ListItem>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const transition = {
  type: "spring",
  bounce: 0.35,
  ease: "easeInOut",
};

function ListItem({ children }) {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: "out",
    style: {
      position: isPresent ? "static" : "absolute",
    },
    animate: isPresent ? "in" : "out",
    variants: {
      in: {
        opacity: 1,
        scale: 1,
      },
      out: {
        scale: 0,
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      },
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };

  return (
    <motion.div {...animations} style={{ originX: 0, originY: 1 }}>
      {children}
    </motion.div>
  );
}
