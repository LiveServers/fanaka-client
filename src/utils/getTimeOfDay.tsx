//this function displays the current timeOfDay
/**
 * Morning
 * Afternoon
 * Evening
 */

const getTimeOfDay = () :string =>{
    let hours = new Date().getHours();
    let message : string = "";
    if(hours < 12){
        message = "Good Morning";
    }
    else if(hours > 11 && hours < 17){
        message = "Good Afternoon";
    }
    else{
        message = "Good Evening";
    }
    return message;
}

export default getTimeOfDay;