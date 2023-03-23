import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

import { tempusApi, useUpdateClientMutation } from 'src/redux/api';

import ClientColor from 'src/components/ClientColor';
import { Client } from 'src/types/Client';

import ClientModal from './components/ClientModal';

const Clients = () => {
  const { data: clients, isFetching } = tempusApi.endpoints.getClients.useQueryState();
  const [updateClient, result] = useUpdateClientMutation();

  const [showModal, setShowModal] = useState<{ show: boolean, client?: Client }>({ show: false, client: undefined });

  if (isFetching || !clients || result.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div id="clients-page">
      {/* TODO: Adding vs Editing */}
      {showModal.show && (
        <ClientModal handleSubmit={() => null} handleCancel={() => setShowModal({ show: false })} client={showModal.client} />
      )}
      <table>
        <thead>
          <tr>
            <th>
              <span>Client</span>
            </th>
            <th>
              <div>
                Active
              </div>
            </th>
            <th>
              Color
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td className="active-cell">
                <input type="checkbox" checked={c.active} onChange={() => updateClient({ _id: c._id, active: !c.active })} />
              </td>
              <td className="color-cell">
                <div>
                  <ClientColor color={c.color} />
                </div>
              </td>
              <td className="edit-cell">
                <button className="edit-button" onClick={() => setShowModal({ show: true, client: c })}>
                  <MdEdit />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <button type="button" onClick={() => setShowModal({ show: true })}>Add Client</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Clients;