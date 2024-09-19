import React, { useState } from 'react';

import { getComparison } from '../services/api'

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      urls: [url1, url2]
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

  return (
    <div className="container">


        {/* Form */}
        <div className="card mt-5">
          <form onSubmit={handleSubmit}>
              <div className="card-header bg-dark text-center text-white py-4">
                  <h1>Ultimate Web Racer</h1>
                  <h2>Choose your runners:</h2>
              </div>
              <div className="card-body bg-success text-white p-3">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div>
                      <div className="mb-3">
                          <label htmlFor="url_1" className="form-label">Sitio web 1:</label>
                          <input
                            type="url"
                            className="form-control"
                            id="url_1"
                            placeholder="Ingrese la URL"
                            value={url1}
                            onChange={(e) => setUrl1(e.target.value)}
                            required
                          />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="url_2" className="form-label">Sitio web 2:</label>
                          <input
                            type="url"
                            className="form-control"
                            id="url_2"
                            placeholder="Ingrese la URL"
                            value={url2}
                            onChange={(e) => setUrl2(e.target.value)}
                            required
                          />
                      </div>
                  </div>
              </div>
              <div className="card-footer bg-dark py-3 d-flex justify-content-center">

                  {
                  loading ? (
                    <div className="spinner-border text-primary my-auto" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )
                  :
                  (
                    <button type='submit' className='btn btn-primary'>¡Run!</button>
                  )
                  }

              </div>
            </form>
        </div>

        {/* Display API response */}
        <div className="mt-5">
          {data.length > 0 && (
            <div className="row">
              {data.map((result, index) => (
                <div className="col-md-6" key={index}>
                  <div className="card mb-4">
                    <div className={`card-header text-white ${result.status == 'success' ? 'bg-success' : 'bg-danger'}`}>
                      <h4>URL: {result.url}</h4>
                      <p>Status: {result.status}</p>
                    </div>
                    <div className="card-body">

                      {result.status == 'success' ? (
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
                      )}



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
