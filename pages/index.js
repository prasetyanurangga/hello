import { useState, useEffect } from "react";
import { motion, usePresence, AnimatePresence } from "framer-motion";
import Color from "color";
import { faker } from "@faker-js/faker";
import parse from "html-react-parser";
import Link from "next/link";

const colorStart = Color("#FF9900");
const colorEnd = Color("#FF320D");

const name = () => `${faker.name.firstName()} ${faker.name.lastName()}`;
const initialState = ["loading"];

const listText = [
  {
    id: "1",
    title: "Hi, I'm Angga Nur Prasetya",
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
        className={`flex h-[700px] w-[500px] space-y-4 p-5 flex-row items-center justify-center `}
      >
        <div className={`h-full flex justify-end flex-col`}>
          <img
            src="https://avatars.githubusercontent.com/u/35420062?v=4"
            className={`h-[50px] w-[50px] rounded-full`}
          />
        </div>
        <div
          className={`h-full flex justify-end flex-col overflow-y-hidden overflow-x-hidden p-5 gap-y-3`}
        >
          <AnimatePresence>
            {[...items].map((item, i) => (
              <ListItem key={item}>
                {item == "loading" ? (
                  <div className="w-[300px] flex flex-col items-start justify-center">
                    <div
                      className={`px-4 items-center  break-all justify-center flex flex-row py-4 border-2 border-gray-200 w-[70px]
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
                      <span>{parse(item.title)}</span>
                      {item && item.content && (
                        <span>
                          {item && item.content ? parse(item.content) : ""}
                        </span>
                      )}
                      {item && item.id == "3" && (
                        <div className="flex flex-row gap-x-2 mt-2">
                          <Link
                            href="https://angganurprasetya.dev/detail_open_project/ipod"
                            className="cursor-pointer"
                          >
                            <img
                              src="https://angganurprasetya.dev/img/ipod.png"
                              className={`h-[80px] w-[80px] rounded-lg`}
                            />
                          </Link>
                          <Link
                            href="https://angganurprasetya.dev/detail_professional_project/tandhur"
                            className="cursor-pointer"
                          >
                            <img
                              src="https://angganurprasetya.dev/img/tandhur.png"
                              className={`h-[80px] w-[80px] rounded-lg`}
                            />
                          </Link>
                          <Link
                            className="cursor-pointer"
                            href="https://angganurprasetya.dev"
                          >
                            <div className="w-[80px] h-[80px] rounded-lg bg-gray-400 text-sm  flex flex-col justify-center items-center">
                              <span className="text-sm">5+</span>
                              <span className="text-xs">Show all</span>
                            </div>
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
