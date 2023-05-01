import Image from "next/image";
import axios from "axios";
import getStripe from "../../get-stripe";

export default function Home() {
  const cartDetails = {};
  // creating stripe checkout
  const redirectToCheckout = async () => {
    const { data: id } = await axios.post("api/checkout_sessions", {
      // obj => 2d arrary => array of objs
      // {item/price : quantity }
      items: Object.entries(cartDetails).map(([{ id, quantity }]) => ({
        price: id,
        quantity,
      })),
    });
    // redirect to checkout
    const stripe = getStripe(); // gets stripe instance
    await stripe.redirectToCheckout({ sessionId: id }); // sends to them to checkout
  };

  return (
    <main className="w-[100vw] h-[100vh] flex items-center flex-col justify-center pt-10">
      <h1 className=" text-4xl ">Welcome to my shop</h1>
      <h1 className=" text-lg ">... the color shop</h1>
      {/* // */}
      <div className="w-[100vw] h-[100vh] relative flex flex-col  text-center items-center justify-center">
        <div className="flex w-full h-full">
          {" "}
          <div className="flex items-center justify-evenly w-[50%] h-[60%] 	mt-10">
            <div className="w-[90%] h-[70%] border flex flex-col items-center justify-center relative">
              <div className="w-full h-full bg-red-500"></div>
              <button className="bg-white text-black border border-black absolute bottom-0 w-full p-2">
                Add to cart
              </button>
            </div>
          </div>
          <div className="flex items-center justify-evenly w-[50%] h-[60%] 	mt-10">
            <div className="w-[90%] h-[70%] border flex flex-col items-center justify-center relative">
              <div className="w-full h-full bg-blue-800"></div>
              <button className="bg-white text-black border border-black absolute bottom-0 w-full p-2">
                Add to cart
              </button>
            </div>
          </div>
          <div className="flex items-center justify-evenly w-[50%] h-[60%] 	mt-10">
            <div className="w-[90%] h-[70%] border flex flex-col items-center justify-center relative">
              <div className="w-full h-full bg-purple-400"></div>
              <button className="bg-white text-black border border-black absolute bottom-0 w-full p-2">
                Add to cart
              </button>
            </div>
          </div>
          <div className="flex items-center justify-evenly w-[50%] h-[60%] 	mt-10">
            <div className="w-[90%] h-[70%] border flex flex-col items-center justify-center relative">
              <div className="w-full h-full bg-green-600"></div>
              <button className="bg-white text-black border border-black absolute bottom-0 w-full p-2">
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => redirectToCheckout()}
          className=" w-[75%] bg-green-500 rounded-2xl aboslute mb-20 p-4 top-0 "
        >
          CHECK OUT
        </button>
      </div>
    </main>
  );
}
