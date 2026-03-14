"use client";

import Book from "@/components/Book";
import BrandLogo from "@/components/BrandLogo";
import Header from "@/components/layouts/Header";
import authApi from "@/services/auth.services";
import Image from "next/image";
// import { notFound } from "next/navigation";

const FeedsPage = () => {
  // const post = false;
  // if (!post) {
  //   notFound();
  // }

  return (
    <>
      <div className="flex-1 h-screen flex justify-end border-r border-gray-200">
        <div className="max-w-70 w-full h-full px-6 flex flex-col justify-between py-12">
          <div className="">
            <BrandLogo
              short
              className="h-5 w-max align-middle text-foreground select-none pointer-events-none hidden md:block"
            />

            <nav className="mt-28">
              <ul className="mb-26 space-y-2">
                <li className="relative">
                  <span className="w-2 h-2 absolute -ms-4 left-0 top-1/2 transform -translate-y-1/2 z-4 rounded-full bg-emerald-500 block"></span>
                  <a className="text-bas " href="">
                    Feeds
                  </a>
                </li>
                <li>
                  <a className="text-base" href="">
                    Categories
                  </a>
                </li>
                <li>
                  <a className="text-base" href="">
                    Authors
                  </a>
                </li>
              </ul>

              <ul className="space-y-1">
                <li>
                  <a className="text-sm" href="">
                    About
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    Privacy
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    Policy
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <Image
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300"
              alt="sidebar item img"
              width={40}
              height={40}
              priority
              className="w-10 h-10 object-cover rounded-md overflow-hidden"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl w-full mx-auto bg-white flex-none">
        <Header />
        <div className="px-6">
          <h1>Dashboard</h1>
          <button onClick={() => authApi.logout()}>Logout</button>
        </div>
      </div>

      <div className="flex-1 h-screen max-h-screen border-l overflow-x-hidden overflow-y-auto border-gray-200 sticky top-0">
        <div className="max-w-70 w-full ps-10 pe-6 space-y-10 py-12">
          <div>
            <div className="mb-5">
              <h2 className="text-base font-semibold">Suggested Contents</h2>
            </div>
            <ul>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Book src="https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg" />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      A Night City
                    </p>
                    <p className="text-sm text-gray-500 leading-tight">
                      Arthur Mk
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Book src="https://blog-cdn.reedsy.com/directories/gallery/241/large_36dc2bfa3ecfa29a41812207f76df7a8.jpg" />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      Into the Wild
                    </p>
                    <p className="text-sm text-gray-500 leading-tight">
                      Jackson Joe
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Book src="https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg" />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      About the Red Flowers
                    </p>
                    <p className="text-sm text-gray-500 leading-tight">
                      Emily Jack
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Book src="https://images.squarespace-cdn.com/content/v1/624da83e75ca872f189ffa42/aa45e942-f55d-432d-8217-17c7d98105ce/image001.jpg" />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      The Blue Waves
                    </p>
                    <p className="text-sm text-gray-500 leading-tight">
                      Samson Thomas
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Book src="https://www.ingramspark.com/hs-fs/hubfs/TrampledbyLove_cover7.jpg?width=375" />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      The Dune
                    </p>
                    <p className="text-sm text-gray-500 leading-tight">
                      Steve Jobs
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Book src="https://marketplace.canva.com/EAD7YHrjZYY/1/0/1003w/canva-blue-illustrated-stars-children%27s-book-cover-haFtaSNXXF4.jpg" />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      A Long Journey Story
                    </p>
                    <p className="text-sm text-gray-500 leading-tight">
                      Mathew M Doe
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-5">
              <h2 className="text-base font-semibold">Top Authors</h2>
            </div>
            <ul>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Image
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300"
                    alt="sidebar item img"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 object-cover rounded-md overflow-hidden"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      Nancy Koshey
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      @nancykosh98
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Image
                    src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=300"
                    alt="sidebar item img"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 object-cover rounded-md overflow-hidden"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      Nimmy Joe
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      @nimmyjoe4412
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300"
                    alt="sidebar item img"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 object-cover rounded-md overflow-hidden"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      Sandra J
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      @sandraj88
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Image
                    src="https://images.unsplash.com/photo-1526510747491-58f928ec870f?q=80&w=300"
                    alt="sidebar item img"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 object-cover rounded-md overflow-hidden"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      Ann Mathew
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      @annmathew701
                    </p>
                  </div>
                </a>
              </li>
              <li className="py-2">
                <a className="flex w-full gap-x-3 items-center" href="">
                  <Image
                    src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=300"
                    alt="sidebar item img"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 object-cover rounded-md overflow-hidden"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      Joel Jose
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      @joeljose143
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-5">
              <h2 className="text-base font-semibold">Recent News</h2>
            </div>
            <ul>
              <li className="py-4 border-b border-b-gray-300">
                <a className="w-full" href="">
                  <p className="text-sm">
                    The Midnight Train by Matt Haig: A magical time-travel
                    romance from the author of The Midnight Library.
                  </p>
                </a>
              </li>
              <li className="py-4 border-b border-b-gray-300">
                <a className="w-full" href="">
                  <p className="text-sm">
                    Vigil by George Saunders: A 192-page novel about a ghost
                    guiding a dying tycoon toward redemption.
                  </p>
                </a>
              </li>
              <li className="py-4 border-b border-b-gray-300">
                <a className="w-full" href="">
                  <p className="text-sm">
                    John of John by Douglas Stuart: A novel about a young man
                    seeking love on a remote Scottish island.
                  </p>
                </a>
              </li>
              <li className="py-4 border-b border-b-gray-300">
                <a className="w-full" href="">
                  <p className="text-sm">
                    Hooked by Asako Yuzuki: A story exploring food, friendship,
                    and loneliness from the author of Butter.
                  </p>
                </a>
              </li>
              <li className="py-4">
                <a className="w-full" href="">
                  <p className="text-sm">
                    Land by Maggie O'Farrell: A multi-generational saga set in
                    post-Great Hunger Ireland.
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedsPage;
