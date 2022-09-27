import * as cook from '../Js/cookieLib.js'
var signInBtn = document.getElementById('signIn');
function checkCredentials()
{
    var email = document.getElementById('email').value;
    var pasword = document.getElementById('password').value;
    if(email===cook.getCookVal('email')&&pasword===cook.getCookVal('password'))
    {
        signInBtn.removeAttribute('disabled');

    }
    else{
        signInBtn.setAttribute('disabled','');
        
    }

}
document.body.addEventListener('mousemove',function()
{
    checkCredentials();
    
})
document.getElementById('signIn').addEventListener('click',function()
{
    window.location.replace('../Html/welcome.html')
})




