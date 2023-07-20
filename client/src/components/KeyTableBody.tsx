import { FaCopy, FaTrash } from "react-icons/fa";
import { Key } from "../lib/types";
import { copyToClipboard, dateFormatter, getJWT } from "../lib/utilities";
import TableCell from "./ui/TableCell";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import Icon from "./ui/Icon";

type Props = {
    rows: Key[]
};

const KeyTableBody = ({ rows }: Props) => {
    const queryClient = useQueryClient();
    const deleteKeyMutation = useMutation({
        mutationKey: ["key"],
        mutationFn: (keyId: string) => {
          return axios.delete(`http://localhost:5000/api/keys/${keyId}`, { withCredentials: true, headers: { "Authorisation": `Bearer ${getJWT()}` } }).then(response => response.data);
        },
        onSuccess: () => queryClient.invalidateQueries(["user"]),
        onError: () => toast.error("Something went wrong!")
      });
      const handleDeleteKey = (keyId: string) => {
        deleteKeyMutation.mutate(keyId);
      };
  return (
    <tbody>
        {
            rows.map(row => (
                <tr className="border-b-[1px]">
                    <TableCell>
                        <Link tabIndex={-1} to={`/my-account/${row.id}/details`}>{row.label}</Link>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{dateFormatter(row.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      <Icon onClick={() => copyToClipboard(row.id)} color="blue" icon={ FaCopy } />
                    </TableCell>
                    <TableCell className="text-center">
                      <Icon onClick={() => handleDeleteKey(row.id)} color="red" icon={ FaTrash } />
                    </TableCell>
                </tr>
            ))
        }
    </tbody>
  );
};

export default KeyTableBody;