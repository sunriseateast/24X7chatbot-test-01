export default function setExpiry(days,currentExpiry){
    const activeon=Date.now() 
    let expiry
 
    if(currentExpiry !==0){
        expiry=currentExpiry + (days * 24 * 60 * 60 * 1000)
    }
    else{
        expiry=activeon + (days * 24 * 60 * 60 * 1000); //30 days
    }

    //Duration in ms
    const durationMS=expiry-activeon

    //convert to days
    const duration=Math.ceil(durationMS/(24 * 60 * 60 * 1000))

    return {activeon,expiry,duration}
}