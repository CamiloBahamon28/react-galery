import React, { useState } from 'react'
import axios from 'axios'
//import {  useHistory } from 'react-router-dom'

export const ImageForm = () => {

    //const history = useHistory();
    const [file, setFile] = useState();
    const [title, setTitle] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData()

        formData.append('file', file);
        formData.append('title', title);

        const res = await axios.post('/api/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress(progressEvent) {
                const { loaded, total } = progressEvent
                const percent = parseInt((loaded * 100) / total);
                setUploadPercentage(percent);
            }
        });
        console.log(res);
        //history.push('/')
    }


    return (
        <div className="col-md-4 offset-md-4">
            {loading && (
                <div className="progress rounded-0">
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${uploadPercentage}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                </div>
            )
            }
            <div className="card bg-dark text-light rounded-0 p-4">
                <div className="card-body">
                    <h3>Upload an Image</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control bg-dark text-light my-3 rounded-0"
                            placeholder="Write a title for you photo"
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            type="file"
                            className="form-control bg-dark text-light rounded-0"
                            onChange={handleChange}
                        />
                        <div className="my-3">
                            <button className="btn btn-success rounded-0 w-100">
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
