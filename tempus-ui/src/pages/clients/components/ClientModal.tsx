import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useForm } from 'react-hook-form';
import { Client } from 'src/types/Client';

import ClientColor from 'src/components/ClientColor';
import Modal from 'src/components/Modal';

type ClientModalProps = {
  client?: Client
  handleCancel: () => void;
  handleSubmit: (name: string, color: string) => void;
}

const ClientModal = (props: ClientModalProps) => {
  const { client, handleCancel, handleSubmit } = props;

  const { clearErrors, formState: { errors }, handleSubmit: handleFormSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      name: client ? client.name : '',
      color: client ? client.color : '',
    }
  });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const onSubmit = async (data) => {
    handleSubmit(data.name, data.color);
  };

  return (
    <Modal>
      <div id="client-form">
        {client ? <h1>Edit Client</h1> : <h1>Add Client</h1>}
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <div id="client-name">
            <span className={`label ${errors.name && 'error-field'}`}>Name</span>
            <input type="text" placeholder="client-name" {...register('name', { required: true })} />
          </div>
          <div id="client-color">
            <span className={`label ${errors.color && 'error-field'}`}>Color</span>
            {/* # symbol here */}
            <input
              id="color-input"
              type="text"
              placeholder="#000000"
              maxLength={7}
              {...register('color', { required: true })}
            />
            <ClientColor color={watch('color')} onClick={() => setShowColorPicker(!showColorPicker)} />
          </div>
          <div id="color-picker">
            <HexColorPicker
              color={watch('color')}
              onChange={(newColor) => { setValue('color', newColor); clearErrors('color'); }}
            />
          </div>
          <div id="save-button">
            <button>Save</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ClientModal;
