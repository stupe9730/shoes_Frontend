import { useEffect } from "react";
import { useLazyGetOrderQuery } from "../redux/userApi";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Histroy = () => {
  const { auth } = useSelector((state) => state.user);
  console.log(auth);

  const [HistoryData, { data, isLoading }] = useLazyGetOrderQuery();
  const subtotal =
    data &&
    data.reduce((sum, item) => {
      const total = item.price * item.qut;
      return sum + total;
    }, 0);
  console.log(subtotal);

  useEffect(() => {
    HistoryData({ logerId: auth && auth._id });
  }, []);

  console.log(data);

  return (
    <>
      {isLoading && <Loader />}
      <div class="alert bg-slate-400 border-none my-3 flex justify-center">
        <div className="text-3xl font-bold">Your Orders</div>
      </div>
      {data && data != 0 ? (
        <div className=" ">
          <div className="md:flex   ">
            <div class="   relative  dark:bg-gray-500 w-full   md:w-full md:ms-16 shadow-md sm:rounded-lg">
              <table className="w-full h-80 dark:text-white  text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text -gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 hidden md:table-cell">
                      Price
                    </th>
                    {/* Show QUANTITY and Total columns only on medium and larger screens */}
                    <th className="hidden md:table-cell px-6 py-3">QUANTITY</th>
                    <th className="hidden md:table-cell px-6 py-3">Total</th>
                    <th scope="col" className="hidden md:table-cell px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item) => (
                      <tr
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        key={item.id}
                      >
                        <th
                          scope="row"
                          className=" px-1 ms:px-6 py-2 text-gray-900 font-normal whitespace-nowrap "
                        >
                          <div className="flex  dark:text-white gap-3">
                            <img
                              src={`  ${item.img}`}
                              className="sm:w-44  sm:h-44 w-28 rounded-md h-28  dark:bg-slate-700 bg-slate-100"
                              alt=""
                            />
                            <div className="flex w-7/12 justify-between ">
                              <div>
                                <p className="my-1   font-bold text-[15px] w-20 relative">
                                  {item.name}
                                </p>
                                <p className="my-1">Color : {item.color}</p>
                                <p className="my-1">Size : {item.size}</p>
                                <p className="my-1">Cat : {item.category}</p>
                              </div>
                              <div className="block w-28 px-1">
                                <div className="sm:px-6 pt-7 md:hidden">
                                  Price ₹ {item.price}
                                </div>
                                {/* Show QUANTITY and Total columns only on medium and larger screens */}
                                <div className="md:hidden mt-1 sm:px-6">
                                  Qut: {item.qut}
                                </div>
                                <div className="md:hidden  mt-1 sm:px-6">
                                  Total : ₹ {(item.price * item.qut).toFixed(2)}
                                </div>
                                <div className="md:hidden my-4">
                                  <button
                                    onClick={(e) =>
                                      window.my_modal_5.showModal()
                                    }
                                    className="btn btn-secondary btn-sm relative sm:-right-[19vw]  "
                                  >
                                    Show
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </th>

                        <td className="px-6 py-4 hidden md:table-cell">
                          ₹ {item.price}
                        </td>
                        {/* Show QUANTITY and Total columns only on medium and larger screens */}
                        <td className="hidden md:table-cell px-6 py-4">
                          {item.qut}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4">
                          ₹ {(item.price * item.qut).toFixed(2)}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 ">
                          <button
                            onClick={(e) => window.my_modal_5.showModal()}
                            className="btn btn-primary "
                          >
                            Show
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-4xl h-full mt-8 text-center">No Orders</div>
      )}
      {/* <button className="btn" onClick={()=>window.my_modal_5.showModal()}>open modal</button> */}
      <dialog id="my_modal_5" className="modal">
        <form
          method="dialog"
          className="modal-box overflow-hidden dark:bg-gray-500"
        >
          <button className="btn btn-sm btn-circle btn-ghost  absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg dark:text-white">Hello!</h3>
          <p className="py-4">
            <div class="flex flex-col space-y-10 max-w-md mx-auto dark:text-white  ">
              <div class="flex items-start gap-4 dark:text-white">
                <div class="flex flex-col items-center">
                  <div class="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <div class="w-px h-full bg-indigo-600"></div>
                </div>
                <div>
                  <h3 class="font-semibold text-black dark:text-white">
                    Profile information
                  </h3>
                  <p class="text-gray-500 text-sm dark:text-white">
                    Profile Infromation
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-4 dark:text-white">
                <div class="flex flex-col items-center">
                  <div class="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <div class="w-px h-full bg-indigo-600"></div>
                </div>
                <div>
                  <h3 class="font-semibold text-black dark:text-white">
                    Order Confirmed
                  </h3>
                  <p class="text-gray-500 text-sm dark:text-white">
                    Your Item has been picked up By Delivery Partner.
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                    <div class="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  </div>
                  <div class="w-px h-full bg-gray-300"></div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-600 dark:text-white">
                    Shipped
                  </h3>
                  <p class="text-gray-500 text-sm dark:text-white">
                    Your items ha been shipped
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  <div class="w-px h-full bg-gray-300"></div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-600 dark:text-white">
                    Out For Delivery
                  </h3>
                  <p class="text-gray-500 text-sm dark:text-white">
                    Your Item is out for Delivery
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="flex flex-col items-center">
                  <div class="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-600 dark:text-white">
                    Delivered
                  </h3>
                  <p class="text-gray-500 text-sm dark:text-white">
                    Your item has been delivered
                  </p>
                </div>
              </div>
            </div>
          </p>
        </form>
      </dialog>
    </>
  );
};

export default Histroy;
