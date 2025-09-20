"use client";

import { motion } from "framer-motion";
import { authClient } from "auth/client";
import { useMemo } from "react";
import { FlipWords } from "ui/flip-words";
import { useTranslations } from "next-intl";

function getGreetingByTime() {
  const hour = new Date().getHours();
  if (hour < 12) return "goodMorning";
  if (hour < 18) return "goodAfternoon";
  return "goodEvening";
}

export const ChatGreeting = () => {
  const { data: session } = authClient.useSession();

  const t = useTranslations("Chat.Greeting");

  const user = session?.user;

  const word = useMemo(() => {
    if (!user?.name) return "";
    const words = [
      t(getGreetingByTime(), { name: user.name }),
      t("conservation", { name: user.name }),
      t("climateChange", { name: user.name }),
      t("environment", { name: user.name }),
    ];
    return words[Math.floor(Math.random() * words.length)];
  }, [user?.name]);

  return (
    <motion.div
      key="welcome"
      className="max-w-3xl mx-auto my-4 h-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-2 leading-relaxed text-center">
        <h1 className="text-2xl md:text-3xl w-full border-current pb-2 text-center">
          <span className="block w-full text-center whitespace-nowrap overflow-visible print:whitespace-nowrap">
            {word ? (
              <FlipWords words={[word]} className="inline-block text-primary" />
            ) : (
              ""
            )}
          </span>
        </h1>
      </div>
    </motion.div>
  );
};
