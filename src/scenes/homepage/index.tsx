import { Divider } from "@mui/material"
import AccountOverView from "../../components/AccountOverView"
import Header from "../../components/Header"

import Categories from "../categories"
import RecentTransactions from "../recentTransaction"

const Homepage = () => {
  return (
    <>
    <div className="text-slate-100 h-[95vh] overflow-scroll">
      <div className="absolute -top-6.. left-0 h-[50vh] w-full bg-gradient-to-r from-pink-200 to-blue-800 filter opacity-30 -z-10 blur-3xl"/>
          <Header/>
          <AccountOverView/>
          <Divider sx={{
            "&":{
              backgroundColor:"white"
            }
          }}/>
          <div className="">
              <Categories/>
              <RecentTransactions/>
          </div>
    </div>  
    </>
  )
}

export default Homepage
