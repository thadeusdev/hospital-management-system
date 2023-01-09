import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import "./featuredInfo.css"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ArrowUpward } from '@mui/icons-material';

const FeaturedInfo = () => {
    const [notifyPatients, setNotifyPatients] = useState(0)
    const [notifyMedicines, setNotifyMedicines] = useState(0)

    useEffect(() => {
        fetch("/patients")
        .then(r => r.json())
        .then(notifyPatients => setNotifyPatients(notifyPatients))
    }, [])

    useEffect(() => {
        if (notifyPatients > 0) {
            toast.success(`${notifyPatients} patients addesuccessfully`, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, [notifyPatients])

    useEffect(() => {
        fetch("/medicines")
        .then(r => r.json())
        .then(notifyMedicines => setNotifyMedicines(notifyMedicines))
    }, [])

    useEffect(() => {
        if (notifyMedicines > 0) {
            toast.success(`${notifyMedicines} appointments addesuccessfully`, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }, [notifyMedicines])

  return (
    <div className='featured'>
        <div className="featuredItem">
            <span className="featuredTitle">Diseases</span>
            <div className="featuredShowContainer">
                <span className="featuredShow">5</span>
                <span className="featuredShowRate">-11.4 <ArrowDownwardIcon className='featuredIcon negative'/></span>
            </div>
            <span className="featuredSub">Currently recorded</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Medicines</span>
            <div className="featuredShowContainer">
                <span className="featuredShow">{notifyMedicines.length}</span>
                <span className="featuredShowRate">-1.4 <ArrowDownwardIcon className='featuredIcon negative'/></span>
            </div>
            <span className="featuredSub">Currently recorded</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Patients</span>
            <div className="featuredShowContainer">
                <span className="featuredShow">{notifyPatients.length}</span>
                <span className="featuredShowRate">-11.4 <ArrowUpward className='featuredIcon'/></span>
            </div>
            <span className="featuredSub">Currently recorded</span>
        </div>
    </div>
  )
}

export default FeaturedInfo