import React from 'react'
import "./medicine.css"
import SevereColdIcon from '@mui/icons-material/SevereCold';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';

const Medicine = () => {
  return (
    <div className='medicine'>
        <div className="medicineTitleContainer">
            <h1 className="medicineTitle">Edit medicine</h1>
            <Link to="/newMedicine">
                <button className="medicineAddButton">Create</button>
            </Link>            
        </div>
        <div className="medicineContainer">
            <div className="medicineShow">
                <div className="medicineShowTop">
                    <div className="medicineShowTopTitle">
                        <span className="medicineShowMedicinename">Asprine</span>
                        <span className="medicineShowMedicineTitle">James Odero</span>
                    </div>
                </div>
                <div className="medicineShowBottom">
                    <span className="medicineShowTitle">Description</span>
                    <div className="medicineShowInfo">
                        <CoronavirusIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">for headache</span>
                    </div> 
                    <span className="medicineShowTitle">Category</span> 
                    <div className="medicineShowInfo">
                        <VerifiedIcon className="medicineShowIcon" />
                        <span className="medicineShowInfoTitle">Tablet</span>
                    </div> 
                    <span className="medicineShowTitle">Is acidic</span> 
                    <div className="medicineShowInfo">
                        <span className="medicineShowInfoTitle">true</span>
                    </div> 
                    <span className="medicineShowTitle">Infant safe</span> 
                    <div className="medicineShowInfo">
                        <span className="medicineShowInfoTitle">true</span>
                    </div>                 
                </div>
            </div>
            <div className="medicineUpdate">
                <span className="medicineUpdateTitle">Edit</span>
                <form className="medicineUpdateForm">
                    <div className="medicineUpdateLeft">
                        <div className="medicineUpdateItem">
                            <label>Name</label>
                            <input type="text" placeholder='Asprine' className='medicineUpdateInput' />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Description</label>
                            <input type="text" placeholder='for headache' className='medicineUpdateInput' />
                        </div>
                        <div className="medicineUpdateItem">
                            <label>Category</label>
                            <input type="text" placeholder='Tablet' className='medicineUpdateInput' />
                        </div> 
                        <div className="medicineUpdateItem">
                            <input type="checkbox" name="yes" value="true"/>
                            <label for="yes"> acidic</label><br/>
                            <input type="checkbox" name="no" value="false"/>
                            <label for="no"> not acidic</label><br/>
                        </div> 
                        <div className="medicineUpdateItem">
                            <input type="checkbox" name="yes" value="true"/>
                            <label for="yes"> infant safe</label><br/>
                            <input type="checkbox" name="no" value="false"/>
                            <label for="no"> not infant safe</label><br/>
                        </div> 
                        <div className="medicineUpdateItem">
                            <label>Patient Name</label>
                            <input type="text" placeholder='John Kilonzo' className='medicineUpdateInput' />
                        </div> 
                        <div className="medicineUpdateItem">
                            <label>Disease</label>
                            <input type="text" placeholder='malaria' className='medicineUpdateInput' />
                        </div>                                                 
                    </div>
                    <div className="medicineUpdateRight">
                        <button className="medicineUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Medicine