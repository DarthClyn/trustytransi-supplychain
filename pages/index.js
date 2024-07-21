import React, { useState, useEffect, useContext} from "react";

import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  Slides,
  StartShipment,} from "../Components/index";

  import { TrackingContext } from "../Conetxt/Tracking";
const index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipmnt,
    getShipment,
    startShipment,
    getShipmentsCount,
    
  } =useContext(TrackingContext);

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile , setOpenProfile] = useState(false);
  const [startModel, setStartModel] = useState(false);
  const [completeModel, setCompleteModel] = useState(false);
  const [getModel, setGetModel] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [allShipmentsdata, setallShipmentsdata]= useState();

  useEffect(() =>{
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setallShipmentsdata(allData);
    };  },[]);
    return (
      <>
      <Slides
      setCurrentSlide={setCurrentSlide}
      currentSlide={currentSlide}
      />
      <Services
      setOpenProfile={setOpenProfile}
      setCompleteModel={setCompleteModel}
      setGetModel={setGetModel}
      setStartModel={setStartModel}
      
      setCreateShipmentModel={setCreateShipmentModel}/>

      <Table
      setCreateShipmentModel={setCreateShipmentModel}
      
      allShipmentsdata={allShipmentsdata}
      />

      <Form
      createShipmentModel={createShipmentModel}
      createShipment={createShipment}
      setCreateShipmentModel={setCreateShipmentModel}
      />

      <Profile
      openProfile={openProfile}
      setOpenProfile={setOpenProfile}
      currentUser={currentUser}
      getShipmentsCount={getShipmentsCount}
      />

      <CompleteShipment
      completeModel={completeModel}
      setCompleteModel={setCompleteModel}
      completeShipmnt={completeShipmnt}
      />

      <GetShipment
      getModel={getModel}
      setGetModel={setGetModel}
      getShipment={getShipment}
      />

      <StartShipment
      startModel={startModel}
      setStartModel={setStartModel}
      startShipment={startShipment}
      />
      </>
    
    );

  };

  export default index;