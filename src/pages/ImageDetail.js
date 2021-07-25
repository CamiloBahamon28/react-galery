import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

export const ImageDetail = () => {

    const [image, setImage] = useState({
        title: '',
        url: '',
        _id: '',
    })

    const params = useParams();
    const history = useHistory();

    const showImageDetail = async () => {
        console.log(params.id);
        const res = await axios.get(`/api/images/${params.id}`);
        setImage(res.data);
    }

    useEffect(() => {
        showImageDetail();
    }, [params.id]);

    const handleDelete = async() =>{
       const res = await axios.delete(`/api/images/${params.id}`);
       console.log(res)
       history.push('/')
    }

    return (
        <div className="row">
            <div className='col-md-4 offset-md-4'>
                <div className="card bg-dark">
                    <img src={image.url} alt={image.title} className="card-img-top" />
                    <div className="card-body">
                        <h1>{image.title}</h1>
                        <button
                            className="btn btn-outline-danger"
                            onClick={handleDelete}
                        >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
