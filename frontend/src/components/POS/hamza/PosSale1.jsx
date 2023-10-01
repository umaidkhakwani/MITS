
import React, { useState, useEffect  } from 'react';
import PosSale3Modal from './PosSale3Modal';
const dummyData = [
  {
    sr: 1,
    barcode: '123456',
    productTitle: 'Product 1',
    retailPrice: 10.99,
    qty: 1,
    total: 54.95,
  },
  {
    sr: 2,
    barcode: '789012',
    productTitle: 'Product 2',
    retailPrice: 15.99,
    qty: 1,
    total: 47.97,
  },
  {
    sr: 3,
    barcode: '456789',
    productTitle: 'Product 3',
    retailPrice: 12.49,
    qty: 1,
    total: 49.96,
  },
  {
    sr: 4,
    barcode: '345678',
    productTitle: 'Product 4',
    retailPrice: 8.95,
    qty: 1,
    total: 58.2,
  },
  {
    sr: 5,
    barcode: '234567',
    productTitle: 'Product 5',
    retailPrice: 14.99,
    qty: 1,
    total: 30.48,
  },
  {
    sr: 6,
    barcode: '654321',
    productTitle: 'Product 6',
    retailPrice: 9.99,
    qty: 1,
    total: 76.93,
  },
  {
    sr: 7,
    barcode: '765432',
    productTitle: 'Product 7',
    retailPrice: 11.79,
    qty: 1,
    total: 36.99,
  },
];
function PosSale1() {
    const [text, setText] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [grossTotal, setGrossTotal] = useState(0);
    const [netTotal, setNetTotal]= useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerContact, setCustomerContact] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [quantities, setQuantities] = useState(dummyData.map((dataItem) => dataItem.qty));
    const gst = 0.18;
    const discount = 0.10; 
    const handleCheckout = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const calculateTotal = (quantity, retailPrice) => {
        if (!isNaN(quantity)) {
        const total = (parseFloat(quantity) * retailPrice * (1 + gst)).toFixed(2);
        return isNaN(total) ? '0.00' : total; 
        }
        return '0.00';
    };
    const handleQuantityChange = (e, index) => {
        const newQuantities = [...quantities];
        newQuantities[index] = e.target.value;
        setQuantities(newQuantities);
    };
    useEffect(() => {
    const newGrossTotal = dummyData.reduce((total, dataItem, index) => {
        const rowTotal = parseFloat(calculateTotal(quantities[index], dataItem.retailPrice));
        return isNaN(rowTotal) ? total : total + rowTotal;
    }, 0);
    const newNetTotal = (newGrossTotal * (1 - discount)).toFixed(2);
    setGrossTotal(newGrossTotal.toFixed(2).toString());
    setNetTotal(newNetTotal);
    }, [quantities]);
    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        console.log('Textarea Content:', newText); 
    };
    const filteredData = dummyData.filter((dataItem) =>
        dataItem.productTitle.toLowerCase().includes(searchInput.toLowerCase())
    );
  return (
    <div>
        <h1 className="text-4xl text-center">POS SALE 1</h1>
        <div className='flex w-full gap-4 px-5'>
            <div className="grid grid-cols-1 md:grid-cols-3 w-4/5 md:gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm text-blue-700">Customer Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border border-blue-900 rounded-sm px-6 py-2 my-2"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="contact" className="block text-sm text-blue-700">Customer Contact#</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        className="w-full border border-blue-900 rounded-sm px-6 py-2 my-2"
                        value={customerContact}
                        onChange={(e) => setCustomerContact(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm text-blue-700">Customer Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="w-full border border-blue-900 rounded-sm px-6 py-2 my-2"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className='w-1/5 flex items-end justify-end ml-5'>
                <h1 className="text-right text-lg md:text-2xl md:font-bold text-blue-700">POS#: 55556</h1>
            </div>
        </div>
        <div className='w-full flex px-5'>
            <div className=' w-10/12'>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg> 
                    </div>
                    <input
                    type="search"
                    id="default-search"
                    className="w-full px-6 py-2 pl-10 border border-blue-900 rounded-sm"
                    placeholder="Barcodes"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>
            <div className='w-2/12'>
                <h1 className="text-right md:text-xl text-sm text-blue-700">Date 8/9/2022</h1>
            </div>
        </div>
        <div className="overflow-x-auto p-3">
            <table className="min-w-full border border-blue-900">
                <thead className="bg-blue-900 text-white">
                    <tr>
                    <th className="border border-blue-900 font-normal px-4 py-2 w-2">Sr</th>
                    <th className="border border-blue-900 font-normal px-4 py-2 w-10">Barcode</th>
                    <th className="border border-blue-900 font-normal px-4 py-2 w-52">Product Title</th>
                    <th className="border border-blue-900 font-normal px-4 py-2 w-10">Retail Price</th>
                    <th className="border border-blue-900 font-normal px-4 py-2 w-5">Qty.</th>
                    <th className="border border-blue-900 font-normal px-4 py-2 w-10">GST</th>
                    <th className="border border-blue-900 font-normal px-4 py-2 w-10">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((dataItem, index) => (
                    <tr key={index}>
                        <td className="border border-blue-900 px-4 w-2 py-2">{dataItem.sr}</td>
                        <td className="border border-blue-900 px-4 w-10 py-2">{dataItem.barcode}</td>
                        <td className="border border-blue-900 px-4 w-52 py-2">{dataItem.productTitle}</td>
                        <td className="border border-blue-900 px-4 w-10 py-2">{dataItem.retailPrice}</td>
                        <td className="border border-blue-900 w-5">
                        <input
                            type="text"
                            className="border-white"
                            name="quantity"
                            id="quantity"
                            placeholder="Qty"
                            value={quantities[index]}
                            onChange={(e) => handleQuantityChange(e, index)}
                        />
                        </td>
                        <td className="border border-blue-900 px-4 w-10 py-2">18%</td>
                        <td className="border border-blue-900 px-4 w-10 py-2">
                        {calculateTotal(quantities[index], dataItem.retailPrice)}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="lg:flex px-3 pb-3">
            <div className="lg:w-1/3">
                <div className="commemts">
                <h2 className="text-blue-700 text-lg font-semibold">Comments</h2>
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    className='w-[350px] lg:w-[450px] h-[180px] border border-solid border-blue-700'
                    placeholder="Enter your text here"
                />
                </div>
            </div>
            <div className="lg:w-1/3 lg:flex lg:justify-center">
                <div className="p-4 mb-4">
                    <div className="flex">
                        <a href='/hold-sale' className="bg-blue-600 text-white px-4 text-center py-2 m-1 w-32  rounded-md">Hold Sale</a>
                        <a href='/adjustment' className="bg-blue-600 text-white px-4 text-center py-2 m-1 w-32  rounded-md">Adjustment</a>
                    </div>
                    <div className="flex">
                        <a href='/card' className="bg-blue-600 text-white px-4 text-center py-2 m-1 w-32  rounded-md">Card</a>
                        <a href='/delete' className="bg-blue-600 text-white px-4 text-center py-2 m-1 w-32  rounded-md">Delete</a>
                    </div>
                    <div className="flex">
                        <a href='/cash' className="bg-blue-600 text-white px-4 text-center py-2 m-1 w-32 rounded-md">Cash</a>
                        <a href='/print-invoice' className="bg-blue-600 text-white px-4 text-center py-2 m-1 w-32 rounded-md">Print Invoice</a>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/3 lg:flex lg:justify-end ">
                <div className="pb-3 w-96">
                    <table className="border-collapse border-blue-900">
                        <tbody>
                            <tr>
                                <td className="border border-blue-900 w-10 px-4 py-2">Gross Total</td>
                                <td className="border border-blue-900 w-10 px-4 py-2"><strong>PKR {grossTotal}</strong></td>
                            </tr>
                            <tr>
                                <td className="border border-blue-900 w-28 px-4 py-2">Discount</td>
                                <td className="border border-blue-900 w-48 px-4 py-2">{discount*100}%</td>
                            </tr>
                            <tr>
                                <td className="border border-blue-900 w-10 px-4 py-2">Net Total</td>
                                <td className="border border-blue-900 w-10 px-4 py-2"><strong>PKR {netTotal}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="col-span-2 my-5 flex justify-center">
                        <button
                            type="button"
                            className="bg-blue-700 py-2 px-6 w-64 text-center text-white font-bold rounded-md block"
                            onClick={handleCheckout}
                        >
                            CheckOut
                        </button>
                        <PosSale3Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            netTotal={netTotal}
                            grossTotal={grossTotal}
                            customerName={customerName}
                            customerContact={customerContact}
                            customerEmail={customerEmail}
                        />
                    </div>
                </div>  
            </div>
        </div>
    </div>
  );
}

export default PosSale1;
