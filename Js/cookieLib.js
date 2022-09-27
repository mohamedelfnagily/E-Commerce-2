//This function will allow the user to add a new cookie
export function addCookie(cookieName,CookieValue,date)
{
    var presistanceDate;
    if(cookieName!==undefined&&CookieValue!==undefined)
    {
        if(date==undefined)
        {
            presistanceDate = new Date();
        }
        var upComingMonth = presistanceDate.getMonth()+1;
        presistanceDate.setMonth(upComingMonth);
        document.cookie = `${cookieName}=${CookieValue}; expires=${presistanceDate.toUTCString()}`;
    }
}
//This function will allow the user to retrieve all the applicable cookies
export function getAllCookies()
{
    var myAssocArr = [];
    var myCookie = document.cookie.split('; ');
    if(myCookie)
    {
        for(var i=0;i<myCookie.length;i++)
        {
            myAssocArr[myCookie[i].split('=')[0]]=myCookie[i].split('=')[1];
        }
    }
    return myAssocArr;
}

//This function will allow the user to get a specific cookie
export function getCookie(cookieName) 
{
    var desiredCookie = '';
    if(cookieName!==undefined)
    {
        var myCookies = getAllCookies();
        
        for(var cook in myCookies)
        {
            if(cook==cookieName)
            {
                desiredCookie = `${cook}=${myCookies[cook]}`;
            }
        }
    }
    return desiredCookie;
}

//This function will allow the user to delete specific cookie
export function deleteCookie(cookieName)
{
    if(cookieName!==undefined)
    {
        var myCookies = getAllCookies();
        
        for(var cook in myCookies)
        {
            if(cook==cookieName)
            {
                var myExpiryDate = new Date();
                var lastMonth = myExpiryDate.getMonth()-1;
                document.cookie=`${cook}=; expires=${myExpiryDate.toUTCString()}`;
            }
        }
    }
}

//This function will check if this page contain this cookie or not
export function hasCookie(cookieName) 
{
    var desiredCookie = '';
    if(cookieName!==undefined)
    {
        var myCookies = getAllCookies();
        
        for(var cook in myCookies)
        {
            if(cook==cookieName)
            {
                return true;
            }
        }
    }
    return false;
}

//This function will return the value of the cookie
export function getCookVal(cookieName)
{
    var desiredVal='';
    if(cookieName!==undefined)
    {
        var myCookies = getAllCookies();
        
        for(var cook in myCookies)
        {
            if(cook==cookieName)
            {
                desiredVal=myCookies[cook];
            }
        }
    }
    return desiredVal;
}