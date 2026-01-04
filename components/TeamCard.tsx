import { div } from "three/tsl";
import { Bungee_Inline } from 'next/font/google';
import Image from "next/image";
import { getCloudinaryCarImage } from "@/lib/utils";
const bungee = Bungee_Inline({
  weight: '400',
  subsets: ['latin'],
});

const DriverCard = ({driver1img, driver1, driver1cha, teamname}: {driver1img: string, driver1: string, driver1cha: string, teamname: string}) => {
  return (
    <a href={`https://www.formula1.com/en/drivers/${driver1.toLowerCase().replace(' ', '-')}.html`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0">
      <div
  className="
    group
    flex flex-col md:flex-row
    items-center
    gap-6
    bg-dark-800
    hover:bg-dark-400
    transition-colors duration-300
    hover:backdrop-blur
    backdrop-blur-md
    border border-white/10
    rounded-2xl
    shadow-lg
    overflow-hidden
    h-full
    w-full
  "
>
  {/* Driver Image */}
  <div className="relative h-64 md:h-80 w-full md:w-56 overflow-hidden shrink-0">
    <Image
      src={driver1img}
      alt={driver1}
      fill
      priority
      className="
        object-cover object-top
        transition-transform duration-500 ease-out
        group-hover:scale-105
      "
    />
  </div>

  {/* Content */}
  <div className="flex flex-col justify-center px-6 py-6 md:py-0 text-center md:text-left flex-1">
    <h5 className="text-xl md:text-2xl font-bold text-white mb-2">
      {driver1}
    </h5>

    <p className="text-sm md:text-base text-neutral-300 max-w-xl">
      {`Current Team: ${teamname}`} <br />
      {`World Championship's: ${driver1cha}`}
    </p>
  </div>
</div>
    </a>

  );
}
const TeamCard = ({ teamname, driver1, driver2, carmodel, carimage, firstentry, headquarters, teamlogo, driver1img, driver2img, chief, powerunit, championships, slug, driver1cha, driver2cha }: { teamname: string, driver1: string, driver2: string, carmodel: string, carimage: string, firstentry: string, headquarters: string, teamlogo: string, driver1img: string, driver2img: string, chief: string, powerunit: string, championships: string, slug: string, driver1cha: string, driver2cha: string }) => {
  return (
    <div>  
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <h2 className={bungee.className + " text-2xl md:text-4xl flex items-center gap-3 md:gap-4 underline"}>
          <span><img src={teamlogo} alt={`${teamname} logo`} width={40} height={40} className="w-8 h-8 md:w-[50px] md:h-[50px]" /></span>
          {teamname}
        </h2>
        <div className="flex-shrink-0 w-full md:w-auto">
          <img 
            src={getCloudinaryCarImage(carimage, 400, 100)} 
            alt={`${teamname} car`} 
            className="w-[250px] md:w-[400px] h-auto object-contain"
          />
        </div>
      </div>
    

      <div className="flex flex-col md:flex-row gap-12">

        <div className="flex-1">
          <h2 className={"text-2xl md:text-3xl my-6 " + bungee.className}>Team Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Full Team Name</p>
              <p className="text-lg md:text-xl font-bold text-white">{teamname}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Base</p>
              <p className="text-lg md:text-xl font-bold text-white">{headquarters}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Team Chief</p>
              <p className="text-lg md:text-xl font-bold text-white">{chief}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Chassis</p>
              <p className="text-lg md:text-xl font-bold text-white">{carmodel}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Power Unit</p>
              <p className="text-lg md:text-xl font-bold text-white">{powerunit}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Constructor's Championships</p>
              <p className="text-lg md:text-xl font-bold text-white">{championships}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">First Team Entry</p>
              <p className="text-lg md:text-xl font-bold text-white">{firstentry}</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className={"text-2xl md:text-3xl my-6 " + bungee.className}>Drivers</h2>
          <div className="drivers flex flex-col gap-8 mb-8">
            <DriverCard driver1img={driver1img} driver1={driver1} driver1cha={driver1cha} teamname={teamname}/>
            <DriverCard driver1img={driver2img} driver1={driver2} driver1cha={driver2cha} teamname={teamname} />
          </div>
        </div>

      </div>


    {/* <p><strong>Drivers:</strong> {driver1} ({driver1cha}), {driver2} ({driver2cha})</p>
    <img src={driver1img} alt={driver1} width={100} height={100} />
    <img src={driver2img} alt={driver2} width={100} height={100} />
    <p><strong>Car Model:</strong> {carmodel}</p>
    <img src={carimage} alt={`${teamname} car`} width={300} height={200} />
    <p><strong>First Entry:</strong> {firstentry}</p>
    <p><strong>Headquarters:</strong> {headquarters}</p>
    <p><strong>Team Principal:</strong> {chief}</p>
    <p><strong>Power Unit:</strong> {powerunit}</p>
    <p><strong>Championships Won:</strong> {championships}</p> */}
    </div>
  );
}

export default TeamCard;