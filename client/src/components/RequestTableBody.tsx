import TableCell from "./ui/TableCell";
import Badge from "./ui/Badge";

import { RequestDetails } from "../lib/types"
import { dateFormatter } from "../lib/utilities";

type Props = {
    rows: RequestDetails[]
};

const statusCodeToColorMap = new Map<string, string>([
    ["2", "bg-green-500"],
    ["3", "bg-orange-500"],
    ["4", "bg-yellow-500"],
    ["5", "bg-red-500"]
]);

const RequestTableBody = ({ rows }: Props) => {
  return (
    <tbody>
        {
            rows.map(row => (
                <tr className="border-b-[1px]">
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.message}</TableCell>
                    <TableCell>
                        <Badge color={statusCodeToColorMap.get(row.statusCode.charAt(0))}>{row.statusCode}</Badge>
                    </TableCell>
                    <TableCell>{row.url}</TableCell>
                    <TableCell>{row.header.startsWith("Bearer") ? "Bearer API_TOKEN" : row.header }</TableCell>
                    <TableCell>
                        {
                            row.query.length === 0 ?
                            <Badge color="bg-red-500">No query parameters.</Badge> : 
                            row.query.map(query => <Badge color="bg-gray-800">{query.replace(",", "=")}</Badge>)
                        }
                    </TableCell>
                    <TableCell>{dateFormatter(row.sentAt)}</TableCell>
                </tr>
            ))
        }
    </tbody>
  );
};

export default RequestTableBody;