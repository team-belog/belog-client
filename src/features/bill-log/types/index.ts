export type Settlement = {
  id: number;
  fromName: string;
  toName: string;
  amount: string;
  status: "request" | "pending" | "completed";
};

export type PaymentItem = {
  id: number;
  thumbnailUrl: string;
  name: string;
  amount: string;
  payer: string;
};

export type DailyPayment = {
  date: string;
  totalAmount: string;
  items: PaymentItem[];
};

export type MenuItem = {
  title: string;
  amount: string;
};

export type Member = {
  name: string;
};

export type BillContent = {
  date: string;
  totalAmount: string;
  members: Member[];
  menu: MenuItem[];
};
