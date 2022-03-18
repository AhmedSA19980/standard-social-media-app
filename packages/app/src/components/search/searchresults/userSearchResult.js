//* we connect DB

//* design user component
import { Info } from "../../../data/D" 


export function UserSearchResult({user,className='', onClick, isOnline=()=> undefined}){

    return(
    <div
     // className={`flex cursor-pointer hover:bg-primary-700 px-4 py-3 w-full rounded-8 ${className}`}
      onClick={onClick}
    >
      <div className="flex mr-3">
        <SingleUser isOnline={user.isOnline} src={user.avatarUrl} size="md" />
      </div>
      <div className="flex flex-col">
        <span className="text-primary-100 font-bold">{user.id}</span>
        <span className="text-primary-300">@{user.name}</span>
      </div>
    </div>
  )
}


const SingleUser =({isOnline = false, src})=>{

    return(
        <>
        <h1>{isOnline}</h1>
        <img src={src} />
        </>
    )

}