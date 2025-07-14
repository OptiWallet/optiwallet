export const getCreditCards = () => "get all credit cards";
export const getCreditCard = (id: string) =>
  `get credit card with id ${id}`;
export const createCreditCard = (creditCard: any) =>
  `create credit card with data ${JSON.stringify(creditCard)}`;
export const updateCreditCard = (id: string, creditCard: any) =>
  `update credit card with id ${id} with data ${JSON.stringify(creditCard)}`;
export const deleteCreditCard = (id: string) =>
  `delete credit card with id ${id}`;