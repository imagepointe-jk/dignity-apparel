import { Customer } from "@/types/schema/woocommerce";

type Props = {
  customer: Customer;
};
export function PrimaryInfo({ customer }: Props) {
  const { firstName, lastName, username, email } = customer;

  return (
    <>
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
    </>
  );
}
