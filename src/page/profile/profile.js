import React from 'react';
import './profile.css';

function Profile() {
    return (
        <div className="profile-container">
            <h1 className="profile-heading">ข้อมูลสมาชิก</h1>
            <div className="info-box">
                <div className="info-item">
                    <label htmlFor="idCard">รหัสบัตร :</label>
                    <input type="text" id="idCard" className='BoxData' readOnly />
                </div>
                <div className="info-item">
                    <label htmlFor="studentId">รหัสนิสิต :</label>
                    <input type="text" id="studentId" className='BoxData' readOnly />
                </div>
                <div className="info-item">
                    <label htmlFor="studentName">ชื่อ-นามสกุล :</label>
                    <input type="text" id="studentName" className='BoxData' readOnly />
                </div>
                <div className="info-item">
                    <label htmlFor="studentEmail">Email :</label>
                    <input type="text" id="studentEmail" className='BoxData' readOnly />
                </div>
            </div>
        </div>
    );
}

export default Profile;
