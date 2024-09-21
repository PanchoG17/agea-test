import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import { getComparison } from '../services/api'

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [device1, setDevice1] = useState('desktop');
  const [device2, setDevice2] = useState('desktop');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      urls: [
      {
        path: url1,
        device: device1
      },
      {
        path: url2,
        device: device2
      }
      ]
    };

    try {
      setData([]);
      setLoading(true)
      setError(null)
      const response = await getComparison(payload);
      setData(response.data);
    } 
    catch (err) {
      setError(err.message);
    } 
    finally {
      setLoading(false);
    }
  };

  const toggleDevice = (deviceSetter, currentDevice) => {
    deviceSetter(currentDevice === 'desktop' ? 'mobile' : 'desktop');
  };

  return (
    <div className="container">

        {/* Form */}
        <div className="card mt-5">
          <form onSubmit={handleSubmit}>
              <div className="card-header bg-dark text-center text-white py-4">
                  <div className="d-flex justify-content-center">
                  <Icon icon="game-icons:bolt-bomb" className='my-auto mx-1 h1' />
                  <h1 className="mb-0 me-4">Ultimate Web Racer</h1>
                  </div>
                  <h2>Choose your runners:</h2>
              </div>
              <div className="card-body bg-success text-white px-3 py-4">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div>
                      <div className="mb-3">
                          <div className="d-flex">
                            <Icon icon="emojione:racing-car" className='my-auto mx-1 h1'/>
                            <input
                              type="url"
                              className="form-control"
                              id="url_1"
                              placeholder="Ingrese la URL 1"
                              value={url1}
                              onChange={(e) => setUrl1(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              data-tooltip={device1}
                              className={`btn ${device1 === 'desktop' ? 'btn-danger' : 'btn-warning'} mx-2`}
                              onClick={() => toggleDevice(setDevice1, device1)}
                            >
                              <Icon icon={device1 === 'desktop' ? 'mdi:monitor' : 'mdi:cellphone'} style={{fontSize:"30px"}} />
                            </button>
                          </div>
                      </div>
                      <div>
                          <div className="d-flex">
                            <Icon icon="emojione:racing-car" className='my-auto mx-1 h1'/>
                            <input
                              type="url"
                              className="form-control"
                              id="url_2"
                              placeholder="Ingrese la URL 2"
                              value={url2}
                              onChange={(e) => setUrl2(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              data-tooltip={device2}
                              className={`btn ${device2 === 'desktop' ? 'btn-danger' : 'btn-warning'} mx-2`}
                              onClick={() => toggleDevice(setDevice2, device2)}
                            >
                              <Icon icon={device2 === 'desktop' ? 'mdi:monitor' : 'mdi:cellphone'} style={{fontSize:"30px"}} />
                            </button>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="card-footer bg-dark py-3 d-flex justify-content-center">
                  {loading ? (
                      <div className="btn btn-light my-auto" role="status">
                        <Icon icon="svg-spinners:eclipse-half" className='my-auto mx-1 h1' />
                      </div>
                  )
                  :
                  (
                      <button type='submit' className='btn btn-light'>
                        <Icon icon="maki:racetrack" className='my-auto mx-1 h1' />
                      </button>
                  )
                  }
              </div>
            </form>
        </div>

        {/* Display API response */}
        <div className="mt-5">
          {data.results?.length > 0 && (
            <div className="row">
              {data.results.map((result, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card mb-4">
                    <div className={`d-flex justify-content-between card-header text-white ${result.url === data.winner ? 'bg-success' : 'bg-danger'}`}>
                      <div className="">
                        <h4 className="mb-1"><strong>URL:</strong>{result.url}</h4>
                        <p className="mb-0"><strong>Status:</strong> {result.status}</p>  
                        <p className="mb-0"><strong>Device:</strong> {result.device}</p>  
                      </div>
                      <Icon 
                        icon={`${result.url === data.winner ? 'pepicons-pencil:thumbs-up-circle' : 'pepicons-pencil:thumbs-down-circle'}`}
                        className='my-auto mx-1 h1'
                      />
                    </div>
                    <div className="card-body">
                      {result.status === 'success' ? (
                        <>
                          <h5 className="card-title">Metrics:</h5>
                          <p>
                            <strong>Speed Index:</strong> {result.metrics.speed_index.display_value} (
                            {result.metrics.speed_index.numeric_value} {result.metrics.speed_index.numeric_unit})
                          </p>
                          <p>
                            <strong>Time to Interactive:</strong> {result.metrics.time_to_interactive.display_value} (
                            {result.metrics.time_to_interactive.numeric_value} {result.metrics.time_to_interactive.numeric_unit})
                          </p>
                        </>
                        )
                        :
                        (
                          <>
                            <h5 className="card-title">Error message:</h5>
                            <p>
                              {result.message}
                            </p>
                          </>
                        )
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

    </div>
  );
};

export default Home;
