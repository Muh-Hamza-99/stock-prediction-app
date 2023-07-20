import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import TableHead from "../components/ui/TableHead";
import PageContainer from "../components/ui/PageContainer";
import Loading from "../components/messages/Loading";
import Problem from "../components/messages/Problem";
import NotAuthenticated from "../components/messages/NotAuthenticated";
import KeyModal from "../components/KeyModal";
import KeyTableBody from "../components/KeyTableBody";

import { isAuthenticated, getUserID, getJWT, dateFormatter, capitalise } from "../lib/utilities";

const MyAccount = () => {
  const authenticated = isAuthenticated();
  if (!authenticated) return (<NotAuthenticated />);

  const [openKeyModal, setOpenKeyModal] = useState(false);
  const userId = getUserID();
  
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
        return axios.get(`http://localhost:5000/api/users/${userId}`, { headers: { "Authorisation": `Bearer ${getJWT()}` } }).then(response => response.data);
    },
  });

  if (userQuery.isLoading) return (<Loading />);
  if (userQuery.isError) return (<Problem />);
  return (
    <>
      <PageContainer>
        <div className="w-full flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{capitalise(userQuery.data.user.username)}</h2>
            <span className="text-gray-600 text-sm">Account created at {dateFormatter(userQuery.data.user.createdAt)}</span>
          </div>
          <button tabIndex={-1} onClick={() => setOpenKeyModal(true)} className="py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600">New Key</button>
        </div>
        <div className="mt-8 w-full flex flex-col justify-center items-center border-collapse">
          { userQuery.data.user?.keys.length === 0 ? (<span>You have keys with this account.</span>) : (
            <div className="text-lg">
              <TableHead columns={["Label", "ID", "Created At", "Copy ID", "Delete"]} />
              <KeyTableBody rows={userQuery.data.user?.keys} />
            </div>
          )}
        </div>
      </PageContainer>
      <KeyModal visible={openKeyModal} onClose={() => setOpenKeyModal(false)} />
    </>
  );
};

export default MyAccount;