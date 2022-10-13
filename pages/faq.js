import { Fragment } from "react";
import { Popover, Transition, Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import Head from "next/head";
import LogoImage from "../components/logoImage";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "FAQs", href: "/faq" },
];

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "Anyone that spends time in video conferences or live stream! No matter the scenario, our service let's you quickly spice up your livestreams.",
  },
  {
    question: "How does it work?",
    answer:
      "When you create an account with Rent My Background, we give a Virtual Background URL. Using OBS, you insert this URL as a web scene in your stream, which will render our Virtual Background. On the Virtual Background, a QR code is displayed that allows users to upload their own images, which will in turn be set as your background. Images are set in the order they are received, and images are rotated automatically based on the expiration time set in your profile.",
  },
  {
    question: "Are submitted images stored on your server?",
    answer:
      "When a participant submits an image, it is stored on the server until it expires. Expiration is set in your profile and the countdown begins from the time the image first is displayed on your stream. After expiration, we delete all files from our servers.",
  },
  {
    question: "How do I prevent abuse?",
    answer:
      "All users must provide their email address when submitting an image. You are able to restrict this email address by domain to limit who can set your background image. Further automated anti-abuse features are in development.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>Rent my Background!</title>
        <meta
          name="description"
          content="Rent out your Twitch, Teams & Zoom virtual backgrounds!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Popover>
          <div className="px-4 mx-auto max-w-7xl sm:px-6">
            <nav
              className="relative flex items-center justify-between sm:h-10 md:justify-center"
              aria-label="Global"
            >
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <a>
                      <span className="sr-only">Rent my Background</span>
                      <LogoImage className="w-auto h-8 sm:h-10" />
                    </a>
                  </Link>
                  <div className="flex items-center -mr-2 md:hidden">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-gray-50 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a className="font-medium text-gray-500 hover:text-gray-900">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
                <span className="inline-flex rounded-md shadow">
                  <Link href="/login">
                    <a className="inline-flex items-center px-4 py-2 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:text-indigo-500">
                      Log in
                    </a>
                  </Link>
                </span>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden"
            >
              <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <LogoImage className="w-auto h-8" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close main menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <Link href="/login">
                  <a className="block w-full px-5 py-3 font-medium text-center text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700">
                    Log in
                  </a>
                </Link>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>

      <div className="bg-gray-50">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
