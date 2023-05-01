import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function TableTransactions() {
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/transactions");
    console.log(response.status);
    return response.data.data;
  });

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mt-5 text-white"> Income Transaction</h2>
      <h2
        className="mb-4 text-light fw-semibold"
        style={{
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      ></h2>
      <Table
        className="border border-2 my-5"
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr className="text-danger">
            <th>No</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Due Date</th>
            <th>Status User</th>
            <th>Status Payment</th>
          </tr>
        </thead>
        <tbody>
          {transaction?.map((item, id) => {
            return (
              <>
                <tr key={item.id}>
                  <td>{id + 1}</td>
                  <td>{item.user.fullname}</td>
                  <td>{item.user.phone}</td>
                  <td>{item.duedate}</td>

                  <td>{item.status}</td>
                  <td>{item.user.subscribe}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
