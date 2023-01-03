import React from 'react'
import "./disease.css"
import SevereColdIcon from '@mui/icons-material/SevereCold';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';

const Disease = () => {
  return (
    <div className='disease'>
        <div className="diseaseTitleContainer">
            <h1 className="diseaseTitle">Edit disease</h1>
            <Link to="/newDisease">
                <button className="diseaseAddButton">Create</button>
            </Link>            
        </div>
        <div className="diseaseContainer">
            <div className="diseaseShow">
                <div className="diseaseShowTop">
                    <div className="diseaseShowTopTitle">
                        <span className="diseaseShowDiseasename">malaria</span>
                        <span className="diseaseShowDiseaseTitle">fever, headache</span>
                    </div>
                </div>
                <div className="diseaseShowBottom">
                    <span className="diseaseShowTitle">Disease</span>
                    <div className="diseaseShowInfo">
                        <CoronavirusIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">malaria</span>
                    </div> 
                    <span className="diseaseShowTitle">Symptoms</span> 
                    <div className="diseaseShowInfo">
                        <VerifiedIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">fever, headache</span>
                    </div> 
                    <span className="diseaseShowTitle">Severity</span> 
                    <div className="diseaseShowInfo">
                        <SevereColdIcon className="diseaseShowIcon" />
                        <span className="diseaseShowInfoTitle">High</span>
                    </div>                  
                </div>
            </div>
            <div className="diseaseUpdate">
                <span className="diseaseUpdateTitle">Edit</span>
                <form className="diseaseUpdateForm">
                    <div className="diseaseUpdateLeft">
                        <div className="diseaseUpdateItem">
                            <label>Name</label>
                            <input type="text" placeholder='malaria' className='diseaseUpdateInput' />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Symptoms</label>
                            <input type="text" placeholder='fever, headache' className='diseaseUpdateInput' />
                        </div>
                        <div className="diseaseUpdateItem">
                            <label>Severity</label>
                            <input type="text" placeholder='High' className='diseaseUpdateInput' />
                        </div>                                                 
                    </div>
                    <div className="diseaseUpdateRight">
                        <button className="diseaseUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Disease