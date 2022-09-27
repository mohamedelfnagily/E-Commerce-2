import * as Cook from './cookieLib.js';

var myRegisterBtn = document.getElementById("registerbtn");
var mySignInBtn = document.getElementById("signIn");
var pwElement = document.getElementById("password");
var passWordPattern = /^[A-Z].{1,8}$/;
var agePAttern = /^[1-9]{2}$/;
var emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function checkPattern(passWord , id,patern)
{
    if(patern.test(passWord))
    {
        document.querySelector(id).style.display='none';
        myRegisterBtn.removeAttribute('disabled');
        return true;
    }
    document.querySelector(id).style.display='block';
    document.querySelector(id).innerHTML = "Not valid";
    document.querySelector(id).style.color = 'red';
    myRegisterBtn.setAttribute('disabled','');
}
function checkNullVals()
{
    var userName = document.getElementById('userName').value;
    var age = document.getElementById('age').value;
    var email = document.getElementById('email').value;
    var pasword = document.getElementById('password').value;
    if(userName!==''&&age!==''&&email!==''&&pasword!=='')
    {
        myRegisterBtn.removeAttribute('disabled');
    }
    else{
        myRegisterBtn.setAttribute('disabled','');
    }

}
pwElement.addEventListener("input",function(){
    
    checkPattern(pwElement.value , '#passWordValid',passWordPattern);
});
document.getElementById("email").addEventListener("input",function(){
    
    checkPattern(document.getElementById("email").value , '#emailValidation',emailPattern)
});
document.getElementById("age").addEventListener("input",function(){
    
    checkPattern(document.getElementById("age").value , '#ageValidation',agePAttern)
});
document.body.addEventListener('mousemove',function()
{
    checkNullVals();
});
document.getElementById("signIn").addEventListener('click',function()
{
    window.location.replace('./Html/signIn.html')
})
myRegisterBtn.addEventListener("click",function()
{
    Cook.addCookie('userName',document.getElementById("userName").value);
    Cook.addCookie('age',document.getElementById("age").value);
    Cook.addCookie('email',document.getElementById("email").value);
    Cook.addCookie('password',document.getElementById("password").value);
    window.location.assign('./Html/signIn.html')
})


window.onload=function()
{
    setTimeout(() => {
        document.querySelector('.welcomingGif').style.display='none';
        document.querySelector('.register').style.display='flex';

    }, 2000);
}