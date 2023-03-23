import { useForm } from 'react-hook-form';

import Time from './components/Time';

const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: object) => console.log(data);

  return (
    <div id="home-page">
      <div id="time-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="time-box-row">
            <div id="client">
              <select id="client-select" {...register('client')}>
                <option value="">Client</option>
                <option value={1}>Client One</option>
                <option value={2}>Client Two</option>
              </select>
            </div>
            <div id="date">
              <input placeholder="Date" type="date" {...register('date')} />
            </div>
            <div id="time">
              <input placeholder="Time" {...register('time')} />
            </div>
          </div>
          <div className="time-box-row">
            <div id="description">
              <input placeholder="Description" {...register('description', { required: true })} />
            </div>
            <div id="save">
              <button className="primary-button">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div style={{ minHeight: '50px' }} />

      <Time />
    </div>
  );
};

export default Home;