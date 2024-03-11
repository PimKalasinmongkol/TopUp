import Swal from "sweetalert2";
import "./TopUp.css";
import { useEffect, useState } from 'react'
import axios from 'axios';

function TopUp() {
  const [money, setMoney] = useState("");
  const [name, setName] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [moneysimple, setMoneysimple] = useState(""); // New state for moneysimple

  const handleButtonClick = (amount) => {
    setMoney(amount.toString());
  };

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        // Assuming you have a single user and you extract data like this
        setName(persons[0].name);
        setCardCode(persons[0].cardcode);
        setMoneysimple(persons[0].moneysimple);
      })
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cardID = {
      name: name
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { cardID })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };

  const showSwal = () => {
    if (!money || money==="0") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูล",
        html: `โปรดกรอกข้อมูลให้ครบถ้วน`,
        confirmButtonText: "ตกลง",
      });
      return;
    }
    Swal.fire({
      title: "บริการเติมเงิน",
      icon: "question",
      html: `คุณต้องการเติมเงิน ${money} บาท<br><br>ชื่อ-นามสกุล: ${name}<br>รหัสบัตรของผู้เติม: ${cardCode}<br>ยอดเงินคงเหลือ: ${moneysimple}`,
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the actual top-up action
        axios.post(`https://jsonplaceholder.typicode.com/topup`, { money: parseInt(money) + parseInt(moneysimple), cardCode })
          .then(res => {
            Swal.fire("เติมเงินสำเร็จ", `${money} บาท`, "success");
          })
          .catch(err => {
            Swal.fire("มีบางอย่างผิดพลาด", "", "error");
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("การเติมเงินถูกยกเลิก", "", "error");
      }
    });
  };

  return (
    <div className="TopUpPage">
      <h1>บริการเติมเงิน</h1>
      <div className="CashNow">
        <p style={{fontSize:"medium",color:"#6F6F6F"}}>ยอดเงินคงเหลือ</p>
        <p>{moneysimple}</p>
      </div>
      <div className="bigBoxInp">
        <div className="dataUser">
          <div className="BoxInput">
            <p>ชื่อ-นามสกุล</p>
            <input
              className="inpName"
              type="text"
              value={name}
              placeholder="ชื่อ-นามสกุล"
              readOnly
            />
          </div>
          <div className="BoxInput">
            <p>รหัสบัตร</p>
            <input
              className="inpCardCode"
              type="text"
              value={cardCode}
              placeholder="รหัสบัตรของผู้เติม"
              readOnly
            />
          </div>
        </div>
        <div className="BoxInput_Cash">
          <p>กรอกจำนวนเงินที่ต้องการ(บาท)</p>
          <input
            type="number"
            className="inpCash"
            value={money}
            placeholder="กรุณาใส่จำนวนเงิน"
            min="20"
            max="5000"
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div className="chooseCash">
          <button onClick={() => handleButtonClick(50)}>50</button>
          <button onClick={() => handleButtonClick(100)}>100</button>
          <button onClick={() => handleButtonClick(150)}>150</button>
          <button onClick={() => handleButtonClick(200)}>200</button>
          <button onClick={() => handleButtonClick(250)}>250</button>
          <button onClick={() => handleButtonClick(300)}>300</button>
        </div>
        <div className="btnYes">
          <button onClick={showSwal}>ยืนยัน</button>
        </div>
      </div>
    </div>
  );
}

export default TopUp;
