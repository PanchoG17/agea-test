import React, { useState, useEffect } from 'react';

import { getComparison } from '../services/api'

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleSubmit = async () => {
    try {
      const response = await getComparison();
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="container">

        <div className="card mt-5">
            <div className="card-header bg-dark text-center text-white py-4">
                <h1>Ultimate Web Racer</h1>
                <h2>Choose your runners:</h2>
            </div>
            <div className="card-body bg-success text-white p-3">
                
                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                    <div>
                        <div class="mb-3">
                            <label for="url_1" class="form-label">Sitio web 1:</label>
                            <input type="text" class="form-control" id="url_1" placeholder="Ingrese la URL"></input>
                        </div>
                        <div class="mb-3">
                            <label for="url_1" class="form-label">Sitio web 2:</label>
                            <input type="text" class="form-control" id="url_2" placeholder="Ingrese la URL"></input>
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer text-center bg-dark py-3">
                <button type='submit' className='btn btn-success'>¡Run!</button>
            </div>
        </div>
    </div>
  );
};

export default Home;
