import { useSelector } from "react-redux";
import { UserType } from "../../state";
import { RootState } from "../../state/rootReducer";
import React, { Suspense, useEffect, useState } from "react";
// import TransactionList from "../../components/TransactionList";
import { IconButton } from "@mui/material";
import { ArrowDownward, ArrowUpward, Sort } from "@mui/icons-material";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

const TransactionList = React.lazy(()=> import("../../components/TransactionList"));

type ApiDataType = {
  amount: number;
  createdAt: string;
  description: string;
  type: string;
  updatedAt: string;
  userId: string;
  __v: 0;
  _id: string;
};


const UserTransaction = () => {
    const [apiData, setapiData] = useState([]);
    const [sortBy, setsortBy] = useState("asc");
    
    const user:UserType  = useSelector((state:RootState)=>state.global.user);
    useEffect(()=>{
      const getAllTranSaction = async()=>{
        const res = await fetch(`https://expense-api-41vr.onrender.com/transactions/all/${user?._id}?sort=${sortBy}`,{
            method:"GET", 
        });
        const data = await res.json();
        setapiData(data);
    }
    getAllTranSaction();
    },[user?._id,sortBy])
  return (
    <>
    <div className="p-1 text-yellow-50 h-[85vh] overflow-scroll">
      <div className="flex p-2 justify-between">
          <IconButton onClick={()=>setsortBy("asc")}>
            <ArrowUpward sx={{color:"red"}}/>
          </IconButton>
            <Sort/>
          <IconButton onClick={()=>setsortBy("desc")}>
            <ArrowDownward sx={{color:"red"}}/>
          </IconButton>
      </div>
        <section className="p-4 flex flex-col gap-6">
          <Suspense fallback={<Spinner/>}>
        {apiData.map((item:ApiDataType)=>(
          <TransactionList key={item._id} amount={Number(item.amount)} description={item.description} type={item.type} time={item.updatedAt} />
        ))}
        </Suspense>
        </section>
    </div>  
          <Footer/>
    </>
  )
}

export default UserTransaction
