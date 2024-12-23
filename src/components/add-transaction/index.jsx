import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context";

export default function TransactionForm() {
  const { handleFormSubmit, onClose, isOpen } = useContext(GlobalContext);
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!type || !amount || !description) {
      alert("Please enter value to each parameter!");
      return;
    }

    handleFormSubmit({
      type: type,
      amount: amount,
      description: description
    });

    setType('')
    setAmount('')
    setDescription('')

    onClose();
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Description</FormLabel>
              <Input
                placeholder="Enter Transaction description"
                name="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter Amount</FormLabel>
              <Input
                placeholder="Enter Transaction amount"
                name="amount"
                type="number"
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
            <RadioGroup mt="5">
              <Radio
                checked={type === "income"}
                value="income"
                colorScheme="blue"
                name="type"
                onChange={(e) => setType(e.target.value)}
              >
                Income
              </Radio>
              <Radio
                checked={type === "expense"}
                value="expense"
                colorScheme="red"
                name="type"
                onChange={(e) => setType(e.target.value)}
              >
                Expense
              </Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button mr={"4"} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
