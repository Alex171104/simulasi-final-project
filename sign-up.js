
  const url = 'https://6361da91fabb6460d8ffede3.mockapi.io/users'
  // const inputFirstName = document.getElementById('form-FirstName');
  // const FirstNameLength = inputFirstName.value.length;
  // const FirstName = inputFirstName.value

  // // console.log(username)
  
  // const inputLastName = document.getElementById('form-LastName');
  // const LastNameLength = inputLastName.value.length;
  // const LastName = inputLastName.value

  // const inputPhoneNumber = document.getElementById('form-PhoneNumber')
  // const PhoneNumberLength = inputPhoneNumber.value.length;
  // const PhoneNumber = inputPhoneNumber.value

  // const inputEmail = document.getElementById('form-email');
  // const emailLength = inputEmail.value.length;
  // const email = inputEmail.value

  // const inputPassword = document.getElementById('form-password')
  // const passwordLength = inputPassword.value.length;

  // if (!FirstNameLength) {
  //   alert('First Name harus diisi');
  // } else if (LastNameLength === 0) {
  //   alert('Last Name harus diisi');
  // } else if (PhoneNumberLength === 0) {
  //   alert('Phone Number Harus Diisi');
  // } else if (emailLength === 0) {
  //   alert('Email harus diisi');
  // } else if (passwordLength === 0) {
  //   alert('password harus diisi');
  // } else {

  // // const greetings = document.querySelector
  // //   ("#greetings");
  // //   console.log(greetings);
  // //   greetings.innerText = "Hello, " + username;

  //   let inputFirstName = ''
  //   localStorage.setItem('FirstName', FirstName)

  // }
  const elForm = document.getElementById('form-regist')
    elForm.addEventListener('submit', function (event) {
      event.preventDefault()
      const formData = new FormData(elForm)
      const values = Object.fromEntries(formData)
       console.log(values)
      const { firstName, lastName, phoneNumber, email, password, tnc } = values
      if (!firstName) {
        alert(`First Name can't be empty !`)
      } else if (!lastName) {
        alert(`Last Name can't be empty !`)
      } else if (!phoneNumber) {
        alert(`Phone Number can't be empty !`)
      } else if (!email) {
        alert(`Email can't be empty !`)
      } else if (!password) {
        alert(`Password can't be empty !`)
      } else if  (!tnc) {
        alert('Please check the terms and condition box !')
      } else {
        const userLogin = {
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          tnc
        }
        // const userLoginStr = JSON.stringify(userLogin)
        // localStorage.setItem('user', userLoginStr)
        // onGreeting(username)
        getDataUser()
          .then(data => {
            // console.log(data)
            if (data) {
              const findUser = data.find(element => element.email === email)
              // console.log(findUser, '<<< find user')
              if (findUser) {
                // jika sudah pernah register
                throw new Error('Username / email is exist !')  
                // membuat error yang automatis, akan masuk ke catch
              } else {
                // jika belum pernah register
                return savedDataUser(userLogin)
              }
            } else {
              // jika data dari API belum ada
              return savedDataUser(userLogin)
            }
          })
          .then(value => {
            // ketika berhasil di saved data ke API
            const dataUserString = JSON.stringify(value)
            localStorage.setItem('user', dataUserString)
            location.href = "https://www.google.com";
            //onGreeting(username)
          })
          .catch(error => {
            const message = error.message || 'Failed create user'
            // console.log(error, '<<< error')
            alert(message)
          })
      }
    })

    function getDataUser () {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then(response => response.json())
          .then(value => {
            // console.log(value)
            resolve(value)
          })
          .catch(error => {
            // console.log(error)
            reject(error)
          })
      })
    }

    function savedDataUser (data = {}) {
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(value => {
            // console.log(value)
            resolve(value)
          })
          .catch(error => {
            // console.log(error)
            reject(error)
          })
      })
    }
    
    // function onGreeting (username = '') {
    //   const elGreeting = document.getElementById('greeting')
    //   const elBtnLogout = document.getElementById('btn-logout')
    //   if (username) {
    //     elGreeting.innerHTML = 'Hello ' + username
    //     elBtnLogout.classList.remove('d-none')
    //     elForm.classList.add('d-none')
    //   } else {
    //     elGreeting.innerHTML = ''
    //     elBtnLogout.classList.add('d-none')
    //     elForm.classList.remove('d-none')
    //   }
    // }

    function logout () {
      localStorage.removeItem('user')
      //onGreeting()
    }

    function checkUserLogin () {
      const getUser = localStorage.getItem('user')
      if (getUser) {
        // jika sudah ada yang login
        const userLogin = JSON.parse(getUser)
        // console.log(userLogin)
        const username = userLogin.username
        //onGreeting(username)
      }
    }

    checkUserLogin()


