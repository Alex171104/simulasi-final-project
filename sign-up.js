// const elFormRegist = document.getElementById('form-regist')
// elFormRegist.addEventListener('submit', function (event) {
//  event.preventDefault()
//  const formData = new FormData(elFormRegist)
//  const values = Object.fromEntries(formData)
//  console.log(values)
//  //First Name, Last Name, Phone Number, Email, Password, tnc
//  const FirstName = values.FirstName
//  const LastName = values.LastName
//  const PhoneNumber = values.PhoneNumber
//  const Email = values.Email
//  const Password = values.Password
//  const tnc = values.tnc

//  // Check condition
//  if (!FirstName) {
//     alert (`First Name must be filled !`) 
//  } else if (!LastName) {
//     alert (`Last Name must be filled !`)
//  } else if (!PhoneNumber) {
//     alert (`Phone Number must be filled !`)
//  } else if (!Email) {
//     alert (`Email must be filled !`)
//  } else if (!Password) {
//     alert (`Password must be filled !`)
//  } else if (!tnc) {
//     alert (`Terms and Condition must be checked !`)
//  } else {
//     console.log (values)
//     const UserData = values
//     const UserDataString = JSON.stringify(UserData)
//     localStorage.setItem('user', UserDataString)
//     onGreeting(FirstName)
//  }
// })

const url = 'https://6352da05d0bca53a8eb68303.mockapi.io/users'
const elForm = document.getElementById('form-regist')
    elForm.addEventListener('submit', function (event) {
      event.preventDefault()
      const formData = new FormData(elForm)
      const values = Object.fromEntries(formData)
      // console.log(values)
      const { FirstName, LastName, PhoneNumber, Email, Password } = values
      if (!FirstName) {
        alert(`First Name can't be empty !`)
      } else if (!LastName) {
        alert(`Last Name can't be empty !`)
      } else if (!PhoneNumber) {
        alert(`Phone Number can't be empty !`)
      } else if (!Email) {
        alert(`Email can't be empty !`)
      } else if (!Password) {
        alert(`Password can't be empty !`)
      } else {
        const userLogin = {
          FirstName,
          LastName,
          PhoneNumber,
          Email,
          Password
        }
        // const userLoginStr = JSON.stringify(userLogin)
        // localStorage.setItem('user', userLoginStr)
        // onGreeting(username)
        getDataUser()
          .then(data => {
            // console.log(data)
            if (data) {
              const findUser = data.find(element => element.FirstName === FirstName || element.email === email)
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
            onGreeting(FirstName)
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
    
    function onGreeting (FirstName = '') {
      const elGreeting = document.getElementById('greeting')
      const elBtnLogout = document.getElementById('btn-logout')
      if (FirstName) {
        elGreeting.innerHTML = 'Hello ' + FirstName
        elBtnLogout.classList.remove('d-none')
        elForm.classList.add('d-none')
      } else {
        elGreeting.innerHTML = ''
        elBtnLogout.classList.add('d-none')
        elForm.classList.remove('d-none')
      }
    }

    function logout () {
      localStorage.removeItem('user')
      onGreeting()
    }

    function checkUserLogin () {
      const getUser = localStorage.getItem('user')
      if (getUser) {
        // jika sudah ada yang login
        const userLogin = JSON.parse(getUser)
        // console.log(userLogin)
        const username = userLogin.username
        onGreeting(username)
      }
    }

    checkUserLogin()