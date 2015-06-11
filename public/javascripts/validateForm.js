/**
 * Created by arpadbudai on 2015.06.11..
 */
function validateForm()
{
  var returnValue = true;

  //reset error messages
  document.getElementById('nameError').innerHTML='';
  document.getElementById('emailError').innerHTML='';
  document.getElementById('ageVerificationError').innerHTML='';

  checkName(document.forms["registerForm"]["name"].value , function (nameError) {

    if (!!nameError) {
      //put error message above the input field
      document.getElementById('nameError').innerHTML=nameError;
      returnValue = false;
    }
    checkEmail(document.forms["registerForm"]["email"].value, function (emailError) {
      if (!!emailError) {
        //put error message above the input field
        document.getElementById('emailError').innerHTML=emailError;
        returnValue = false;
      }
      verifyAge(document.forms["registerForm"]["age"].value, function (ageVerificationError) {
        if (!!ageVerificationError) {
          //put error message above the input field
          document.getElementById('ageVerificationError').innerHTML=ageVerificationError;
          returnValue = false;
        }
      })
    })
  });
  return returnValue;
}

function checkName(name, callback) {
  var regex = /^[a-zA-Z ]{3,60}$/;
  var nameError = '';
  if(!!name) {

    if (regex.test(name)){
      return callback()
    }
    nameError = 'Not a valid name, must be alphabets between 3-60 characters long';
    return callback(nameError)
  }
  nameError = 'Please fill in the name field';
  return callback(nameError)
}

function checkEmail(email, callback) {
  var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if (emailRegex.test(email)) {
    return callback()
  }
  var emailError = 'Please type in a valid e-mail address';
  return callback(emailError)
}

function verifyAge(age, callback) {
  var ageVerificationError = '';
  // 18 years in unix timestamp
  var unixEighteen = 567993600;
  //unix timestamp conversion
  var date =  Math.floor(new Date(age) / 1000);
  var diff = Math.abs((Math.floor(Date.now() / 1000)) - date);

  if (unixEighteen > diff || isNaN(date)) {
    ageVerificationError = 'Sorry, you must be at least 18 years old to register for this event';
    return callback(ageVerificationError);
  }
  return callback();

}

