import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as api from "../../api";
import { jwtDecode } from "jwt-decode";
import { getLoggedInUser } from "../../utils/get-logged-in-user";

const WagerHistory = () => {
  const [wagerHistory, setWagerHistory] = React.useState([]);

  React.useEffect(() => {
    const loadWagerHistory = async () => {
      const user = getLoggedInUser();
      const { data } = await api.wagerHistory({ email: user.email });
      const wagerHistoryDecoded = data.token ? jwtDecode(data.token) : "null";
      setWagerHistory(wagerHistoryDecoded.recentWagers);
    };
    loadWagerHistory();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Recent Wagers</TableCell>
            <TableCell align="center">Result</TableCell>
            <TableCell align="center">Payout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wagerHistory.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.amount} Tokens</TableCell>
              <TableCell
                align="center"
                sx={{ color: row.payoutAmount > 0 ? "green" : "red" }}
              >
                {row.flipWasHeads ? "Heads" : "Tails"}
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: row.payoutAmount > row.amount * 2 ? "green" : "" }}
              >
                {row.payoutAmount > row.amount * 2 ? "Bonus " : ""}
                {row.payoutAmount === row.amount * 2 ? "Won " : ""}
                {row.payoutAmount} Tokens
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default WagerHistory;
