import { createContext, useState } from "react";
import {useDisclosure} from "@chakra-ui/react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);

  function handleFormSubmit(formData) {
      console.log('formData', formData);
      let type = formData.type;
      if (type === "income") {
          setTotalIncome(totalIncome + parseInt(formData.amount));
          setIncomeTransactions((array) => [...array, { ...formData, id: Date.now() }]);
      } else {
          setTotalExpense(totalExpense + parseInt(formData.amount));
          setExpenseTransactions((array) => [...array, { ...formData, id: Date.now() }]);
      }
  }

  return (
    <GlobalContext.Provider
      value={{
        totalExpense,
        totalIncome,
        handleFormSubmit,
          isOpen,
          onOpen,
          onClose,
          incomeTransactions,
          expenseTransactions
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
