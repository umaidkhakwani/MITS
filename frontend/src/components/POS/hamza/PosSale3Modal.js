import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
  },
  content: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: 'none',
    background: 'none',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0',
    outline: 'none',
    padding: '0',
    margin: '0',
  },
};

function PosSale3Modal({
  isOpen,
  onRequestClose,
  netTotal,
  grossTotal,
  customerName,
  customerContact,
  customerEmail,
}) {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handlePrintInvoice = () => {
    console.log('Net Total:', netTotal);
    console.log('Gross Total:', grossTotal);
    console.log('Customer Name:', customerName);
    console.log('Customer Contact:', customerContact);
    console.log('Customer Email:', customerEmail);
    console.log('Amount:', amount);
    console.log('Balance:', balance);
  };

  const handleButtonClick = (value) => {
    if (focusedInput === 'amount') {
      setAmount((prevAmount) => prevAmount + value);
    } else if (focusedInput === 'balance') {
      setBalance((prevBalance) => prevBalance + value);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="pos-sale-modal"
      style={customStyles}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Net Total: PKR 758
        </Typography>
        <TextField
          label="Enter Amount"
          variant="outlined"
          value={amount}
          onFocus={() => setFocusedInput('amount')}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Balance"
          variant="outlined"
          value={balance}
          onFocus={() => setFocusedInput('balance')}
          onChange={(e) => setBalance(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <Button
              key={number}
              variant="contained"
              onClick={() => handleButtonClick(number.toString())}
              sx={{ mx: 1 }}
            >
              {number}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            onClick={handlePrintInvoice}
            color="primary"
          >
            Print Invoice
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PosSale3Modal;



// import React, { useState } from 'react';
// // import Modal from 'react-modal'; 
// import Modal from '@mui/material/Modal';

// // Modal.setAppElement('#root');

// const customStyles = {
//   overlay: {
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     backdropFilter: 'blur(5px)',
//     zIndex: 1000,
//   },
//   content: {
//     position: 'absolute',
//     top: '0',
//     left: '0',
//     right: '0',
//     bottom: '0',
//     border: 'none',
//     background: 'none',
//     overflow: 'auto',
//     WebkitOverflowScrolling: 'touch',
//     borderRadius: '0',
//     outline: 'none',
//     padding: '0',
//     margin: '0',
//   },
// };

// function PosSale3Modal({ isOpen, onRequestClose, netTotal, grossTotal, customerName, customerContact, customerEmail }) {
//   const [amount, setAmount] = useState('');
//   const [balance, setBalance] = useState('');
//   const [focusedInput, setFocusedInput] = useState(null);

//   const handlePrintInvoice = () => {
//     console.log('Net Total:', netTotal);
//     console.log('Gross Total:', grossTotal);
//     console.log('Customer Name:', customerName);
//     console.log('Customer Contact:', customerContact);
//     console.log('Customer Email:', customerEmail);
//     console.log('Amount:', amount);
//     console.log('Balance:', balance);
//   };

//   const handleButtonClick = (value) => {
//     if (focusedInput === 'amount') {
//       setAmount((prevAmount) => prevAmount + value);
//     } else if (focusedInput === 'balance') {
//       setBalance((prevBalance) => prevBalance + value);
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Pos Sale 3 Modal"
//       style={customStyles}
//     >
//       <button
//         onClick={onRequestClose}
//         className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
//       >
//         Close
//       </button>
//       <div className="flex justify-center">
//         <div className="inputs-section">
//           <form action="">
//             <h1 className="text-4xl text-center text-blue-800 my-5">Net Total: PKR 758</h1>
//             <label htmlFor="amount" className="block text-sm text-blue-700">
//               Enter Amount
//             </label>
//             <input
//               type="text"
//               id="amount"
//               name="amount"
//               className="w-full border border-blue-900 rounded-sm px-6 py-2 my-2"
//               value={amount}
//               onFocus={() => setFocusedInput('amount')}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//             <label htmlFor="balance" className="block text-sm text-blue-700 mb-2">
//               Balance
//             </label>
//             <input
//               type="text"
//               id="balance"
//               name="balance"
//               className="w-full border border-blue-900 rounded-sm px-6 py-2"
//               value={balance}
//               onFocus={() => setFocusedInput('balance')}
//               onChange={(e) => setBalance(e.target.value)}
//             />
//             <div className="grid grid-cols-3 gap-2 mt-4 p-5">
//               {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
//                 <button
//                   key={number}
//                   type="button"
//                   className="bg-blue-900 text-white text-lg font-bold border border-blue-900 rounded-md py-4"
//                   onClick={() => handleButtonClick(number.toString())}
//                 >
//                   {number}
//                 </button>
//               ))}
//               <button
//                 type="button"
//                 className="bg-blue-900 text-white text-lg font-bold border border-blue-900 rounded-md py-4 col-start-2"
//                 onClick={() => handleButtonClick('0')}
//               >
//                 0
//               </button>
//             </div>
//             <div className="col-span-3 flex justify-center my-8">
//               <button
//                 type="button"
//                 className="bg-blue-900 py-2 px-6 text-center text-white font-bold rounded-md block"
//                 onClick={handlePrintInvoice}
//               >
//                 Print Invoice
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default PosSale3Modal;
