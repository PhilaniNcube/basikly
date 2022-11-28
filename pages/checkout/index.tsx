import Head from "next/head";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { manrope } from "../../components/Shared/Navbar";
import formatCurrency from "../../lib/format";
import { HtmlProps } from "next/dist/shared/lib/html-context";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import Link from "next/link";


const plans = [
  {
    name: "Express",
    description: "2-4 business days",
    price: 35,
  },
  {
    name: "Standard",
    description: "5-8 business days",
    price: 25,
  },

];



const Checkout = () => {

 const [selected, setSelected] = useState(plans[0])

 const {
   cartItems,
   removeFromCart,
   cartTotal,
   increaseCartQuantity,
   decreaseCartQuantity,
 } = useShoppingCart();

  return (
    <>
      <Head>
        <title>Checkout </title>
      </Head>
      <main className={`px-4 py-12 bg-slate-200 ${manrope.className}`}>
        <form className="max-w-7xl mx-auto text-slate-700">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-700">
            Checkout
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-slate-300 rounded-xl mt-2">
            <div className="w-full p-4 md:p-10">
              <div className="w-full grid grid-cols-6 gap-2 py-3">
                <h2 className="text-lg md:text-xl font-medium col-span-6">
                  Contact Information
                </h2>
                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="w-full col-span-6" aria-hidden="true">
                  <div className="py-5 w-full">
                    <div className="border-t border-gray-300" />
                  </div>
                </div>

                <h2 className="text-lg md:text-xl font-medium col-span-6">
                  Shipping information
                </h2>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    name="street_address"
                    id="street_address"
                    autoComplete="street_address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="suburb"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Suburb
                  </label>
                  <input
                    type="text"
                    name="suburb"
                    id="suburb"
                    autoComplete="suburb"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Province
                  </label>
                  <input
                    type="text"
                    name="province"
                    id="province"
                    autoComplete="province"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="postal_code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    autoComplete="postal_code"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    id="phone"
                    autoComplete="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="w-full col-span-6" aria-hidden="true">
                  <div className="py-5 w-full">
                    <div className="border-t border-gray-300" />
                  </div>
                </div>

                <h2 className="text-lg md:text-xl font-medium col-span-6">
                  Delivery Method
                </h2>

                <div className="w-full col-span-6 py-6">
                  <div className="max-w-md w-full ">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <RadioGroup.Label className="sr-only">
                        Delivery Methods
                      </RadioGroup.Label>
                      <div className="space-y-2">
                        {plans.map((plan) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                  : ""
                              }
                              ${
                                checked
                                  ? "bg-sky-900 bg-opacity-75 text-white"
                                  : "bg-white"
                              }
                                relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-bold  ${
                                          checked
                                            ? "text-white"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {plan.name}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="span"
                                        className={`inline ${
                                          checked
                                            ? "text-sky-100"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        <span>{plan.description}</span>{" "}
                                        <span aria-hidden="true">&middot;</span>{" "}
                                        <span>
                                          {formatCurrency(plan.price)}
                                        </span>
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className="shrink-0 text-white">
                                      <CheckIcon className="h-6 w-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 flex flex-col bg-white rounded-xl">
              <div className="mt-8 ">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.image.url}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link href={`/products/${product.slug}`}>
                                  {product.title}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                {formatCurrency(product.price)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.colour}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center">
                              <button
                                type="button"
                                className="font-medium text-teal-600 hover:text-teal-500"
                                onClick={() => decreaseCartQuantity(product)}
                              >
                                <MinusIcon className="h-8 w-8 text-slate-800" />
                              </button>
                              <span className="flex items-center justify-center text-xl font-medium h-10 w-10">
                                {product.quantity}
                              </span>
                              <button
                                type="button"
                                className="font-medium text-teal-600 hover:text-teal-500"
                                onClick={() => increaseCartQuantity(product)}
                              >
                                <PlusIcon className="h-8 w-8 text-slate-800" />
                              </button>
                            </div>
                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-teal-600 hover:text-teal-500"
                                onClick={() => removeFromCart(product)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full col-span-6" aria-hidden="true">
                  <div className="py-5 w-full">
                    <div className="border-t border-gray-300" />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-800 font-bold text-lg">Subtotal:</p>
                  <p className="text-slate-800 font-bold text-lg">
                    {formatCurrency(cartTotal)}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-800 font-bold text-lg">Shipping:</p>
                  <p className="text-slate-800 font-bold text-lg">
                    {formatCurrency(selected.price)}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-slate-800 font-bold text-lg">Total:</p>
                  <p className="text-slate-800 font-bold text-lg">
                    {formatCurrency(selected.price + cartTotal)}
                  </p>
                </div>

                <div className="w-full col-span-6" aria-hidden="true">
                  <div className="py-5 w-full">
                    <div className="border-t border-gray-300" />
                  </div>
                </div>

                <button className="w-full text-center py-3 mt-8 text-white font-medium text-xl rounded-lg bg-teal-700" type="submit">Confirm Order</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};
export default Checkout;



