"use client";
import React from "react";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export enum plan {
  hobby = "hobby",
  starter = "starter",
  pro = "pro",
}

export type Plan = {
  id: string;
  name: string;
  price: number | string;
  subText?: string;
  currency: string;
  features: string[];
  featured?: boolean;
  buttonText?: string;
  additionalFeatures?: string[];
  onClick: () => void;
};

const plans: Array<Plan> = [
  {
    id: plan.hobby,
    name: "Free Will",
    price: 0,
    subText: "",
    currency: "KES",
    features: [
      "Basic will template",
      "Up to 5 assets",
      "Blockchain verification",
      "Email support",
      "Digital download",
    ],
    buttonText: "Get Started",
    onClick: () => {
      console.log("Get Free Will");
    },
  },
  {
    id: plan.starter,
    name: "Verified Will",
    price: 15000,
    subText: " one-time",
    currency: "KES",
    featured: true,
    features: [
      "Legal review by attorneys",
      "Notarization service",
      "Unlimited assets",
      "Priority support",
    ],
    buttonText: "Get Verified",
    additionalFeatures: ["Everything in Free Will"],
    onClick: () => {
      console.log("Get Verified Will");
    },
  },
  {
    id: plan.pro,
    name: "Trust",
    price: 50000,
    subText: " one-time",
    currency: "KES",
    features: [
      "Trust establishment",
      "Asset protection planning",
      "Tax optimization guidance",
      "Dedicated legal advisor",
    ],
    additionalFeatures: ["Everything in Free Will", "Everything in Verified Will"],
    buttonText: "Setup Trust",
    onClick: () => {
      console.log("Setup Trust");
    },
  },
];

export function SimplePricingWithThreeTiers() {
  return (
    <div className="relative isolate bg-transparent px-4 py-0 sm:py-10 lg:px-4 max-w-7xl mx-auto">
      <div
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      ></div>
      <>
        <h2 className="pt-4 font-bold text-lg md:text-4xl text-center text-neutral-800 dark:text-neutral-100">
          Simple pricing for advanced people
        </h2>
        <p className="max-w-md mx-auto text-base text-center text-neutral-600 dark:text-neutral-300 mt-4">
          Our pricing is designed for advanced people who need more features and
          more flexibility.
        </p>
      </>

      <div
        className={cn(
          "mx-auto grid grid-cols-1 gap-4  mt-20 ",
          "max-w-7xl mx-auto  md:grid-cols-2 xl:grid-cols-3"
        )}
      >
        {plans.map((tier, tierIdx) => {
          return <Card plan={tier} key={tier.id} onClick={tier.onClick} />;
        })}
      </div>
    </div>
  );
}

const Card = ({ plan, onClick }: { plan: Plan; onClick: () => void }) => {
  return (
    <div
      className={cn(
        "p-1 sm:p-4 md:p-4 rounded-3xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800"
      )}
    >
      <div className="flex flex-col gap-4 h-full justify-start items-center text-center">
        <div
          className={cn(
            "p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-input w-full dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)] flex flex-col items-center text-center"
          )}
        >
          <div className="flex flex-col items-center w-full relative mb-4 gap-2">
            <p
              className={cn("font-semibold text-lg text-black dark:text-white")}
            >
              {plan.name}
            </p>
            {plan.featured && (
              <div
                className={cn(
                  "font-medium text-xs px-3 py-1 rounded-full relative bg-neutral-900 dark:bg-white dark:text-black text-white mt-1"
                )}
              >
                <div className="absolute inset-x-0 bottom-0 w-3/4 mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                Featured
              </div>
            )}
          </div>
          <div className="mt-1 w-full flex flex-col items-center">
            <div className="flex items-end justify-center w-full">
              <span
                className={cn(
                  "text-lg font-bold text-neutral-500 dark:text-neutral-200"
                )}
              >
                {plan.currency}
              </span>
              <div className="flex items-start gap-2 ml-1">
                <span
                  className={cn(
                    "text-3xl md:text-7xl font-bold dark:text-neutral-50 text-neutral-800"
                  )}
                >
                  {plan?.price}
                </span>
              </div>
              <span
                className={cn(
                  "text-base font-normal text-neutral-500 dark:text-neutral-200 mb-1 md:mb-2 ml-1"
                )}
              >
                {plan.subText}
              </span>
            </div>
          </div>
          <button
            className={cn(
              "w-full mt-8 mb-2 px-2 py-2 rounded-lg bg-gradient-to-b from-sunset-orange to-deep-coral text-white font-medium shadow-sm"
            )}
            onClick={onClick}
          >
            {plan.buttonText}
          </button>
        </div>
        <div className="mt-1 p-4 flex flex-col items-center text-center">
          {plan.features.map((feature, idx) => (
            <Step key={idx}>{feature}</Step>
          ))}
        </div>
        {plan.additionalFeatures && plan.additionalFeatures.length > 0 && <Divider />}
        <div className="p-4 flex flex-col items-center text-center">
          {plan.additionalFeatures?.map((feature, idx) => (
            <Step additional key={idx}>
              {feature}
            </Step>
          ))}
        </div>
      </div>
    </div>
  );
};

const Step = ({
  children,
  additional,
}: {
  children: React.ReactNode;
  additional?: boolean;
  featured?: boolean;
}) => {
  return (
    <div className="flex items-start justify-start gap-2 my-4">
      <div
        className={cn(
          "h-4 w-4 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5",
          additional ? "bg-sky-500" : "bg-neutral-700"
        )}
      >
        <IconCheck className="h-3 w-3 [stroke-width:4px] text-neutral-300" />
      </div>
      <div className={cn("font-medium text-black text-sm dark:text-white")}>
        {children}
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="relative">
      <div className={cn("w-full h-px dark:bg-neutral-950 bg-white")} />
      <div className={cn("w-full h-px bg-neutral-200 dark:bg-neutral-800")} />
      <div
        className={cn(
          "absolute inset-0 h-5 w-5 m-auto rounded-xl dark:bg-neutral-800 bg-white shadow-[0px_-1px_0px_0px_var(--neutral-200)] dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)] flex items-center justify-center"
        )}
      >
        <IconPlus
          className={cn(
            "h-3 w-3 [stroke-width:4px] dark:text-neutral-300 text-black"
          )}
        />
      </div>
    </div>
  );
};