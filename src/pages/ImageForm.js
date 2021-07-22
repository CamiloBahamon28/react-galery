import React, { useState } from 'react'
import axios from 'axios'

export const ImageForm = () => {

    const [file, setFile] = useState();
    const [title, setTitle] = useState('');

    const handleChange = e => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('file', file);
        formData.append('title', title);

        const res = await axios.post('/api/images/upload', formData)
        console.log(res);

    }


    return (
        <div className="col-md-4 offset-md-4">
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
