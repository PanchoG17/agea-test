import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import { getComparison } from '../services/api'

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [urlInputs, setUrlInputs] = useState([{ url: 'https://', device: 'desktop' }, { url: 'https://', device: 'desktop' }]);

  // Handle url changes
  const handleChange = (index, value) => {
    const newUrlInputs = [...urlInputs];
    newUrlInputs[index].url = value;
    setUrlInputs(newUrlInputs);
  };
  // Toggle device change
  const toggleDevice = (index) => {
    const newUrlInputs = [...urlInputs];
    newUrlInputs[index].device = newUrlInputs[index].device === 'desktop' ? 'mobile' : 'desktop';
    setUrlInputs(newUrlInputs);
  };
  // Add input URL
  const addUrlInput = () => {
    setUrlInputs([...urlInputs, { url: 'https://', device: 'desktop' }]);
  };
  // Remove input URL
  const removeUrlInput = (index) => {
    if (urlInputs.length > 2) {
      const newUrlInputs = urlInputs.filter((_, i) => i !== index);
      setUrlInputs(newUrlInputs);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setData([]);
      setLoading(true)
      setError(null)
      const response = await getComparison({urls: urlInputs});
      setData(response.data);
    } 
    catch (err) {
      setError(err.message);
    } 
    finally {
      setLoading(false);
    }
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
              <div className="card-body text-white px-3 py-4">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {urlInputs.map((input, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex">
                        <Icon icon="emojione:racing-car" className="my-auto mx-1 h1" />
                        <input
                          type="url"
                          className="form-control"
                          placeholder={`Ingrese la URL ${index + 1}`}
                          name="url"
                          value={input.url}
                          onChange={(e) => handleChange(index, e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className={`btn ${input.device === 'desktop' ? 'btn-danger' : 'btn-warning'} ms-2`}
                          onClick={() => toggleDevice(index)}
                        >
                          <Icon icon={input.device === 'desktop' ? 'mdi:monitor' : 'mdi:cellphone'} style={{ fontSize: "25px" }} />
                        </button>
                        
                        <button 
                          type="button" 
                          className="btn btn-danger ms-2" 
                          onClick={() => removeUrlInput(index)}
                          disabled={urlInputs.length <= 2}
                        >
                          <Icon icon="ph:trash" style={{ fontSize: "25px" }} />
                        </button>
                      
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary ms-2" onClick={addUrlInput} disabled={urlInputs.length >= 10}>
                      <Icon icon="typcn:plus" style={{ fontSize: "25px" }} />
                    </button>
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
                        <h4 className="mb-1"><strong>URL:</strong> {result.url}</h4>
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
