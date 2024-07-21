import images from "../Images/index";
import Image from "next/image"

export default ({
  setOpenProfile,setCompleteModel,
  setGetModel,setStartModel,setCreateShipmentModel,}) => {
    const team = [
      {
        avatar: images.userProfile,
      },
      {
        avatar: images.shipCount,
      },
      {
        avatar: images.getShipment,
      },
      {
        avatar: images.startShipment,
      },

      {
        avatar: images.send,
      },
      {
        avatar: images.compShipment,
      },

 
    ];

    const openModelBox = (text) => {
      if (text === 6) {
        setCompleteModel(true);
      } else if (text === 3) {
        setGetModel(true);
      } else if (text === 4) {
        setStartModel(true);
      } else if (text === 1) {
        setOpenProfile(true);
      }
        else if (text === 2) {
      setCreateShipmentModel(true)
        }
    };
  
    return (
      <section className="py-0 pb-14">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12">
            <ul className="grid gap-0.001 sm:grid-cols-2 md:grid-cols-3">
              {team.map((item, i) => (
                <li key={i}>
                  
                  <div onClick={() => openModelBox(i + 1)} className="w-full h-50 sm:h-42 md:h-21">
                    <Image src={item.avatar} width={300} height={300} className="object-cover object-center  rounded-full  " alt="" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  };
