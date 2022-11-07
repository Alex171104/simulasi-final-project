const url = 'https://6361da91fabb6460d8ffede3.mockapi.io/users'
    const elForm = document.getElementById('form-login')
    elForm.addEventListener('submit', function (event) {
      event.preventDefault()
      const formData = new FormData(elForm)
      const values = Object.fromEntries(formData)
      console.log(values)
      const { email, password } = values
      if (!email) {
        alert(`Email can't be empty !`)
      } else if (!password) {
        alert(`Password can't be empty !`)
      } else {
        const userLogin = {
          email,
          password,
        }
        // const userLoginStr = JSON.stringify(userLogin)
        // localStorage.setItem('user', userLoginStr)
        // onGreeting(username)

        getDataUser()
          .then(data => {
            // console.log(data)
            if (data) {
              const findUser = data.find(element => element.password === password)
              console.log(findUser, '<<< find user')
              if (findUser) {
                // jika sudah pernah register
                location.href = "https://www.youtube.com";  
                alert('Berhasil Log In')
                //membuat error yang automatis, akan masuk ke catch
              } else {
                // jika belum pernah register
                //return savedDataUser(userLogin)
                alert('Sorry, your password is uncorrect')
              }
             } 
          })

          .then(value => {
            // ketika berhasil di saved data ke API
            const dataUserString = JSON.stringify(value)
            localStorage.setItem('user', dataUserString)
          })
          .catch(error => {
            const message = error.message || 'Failed log in'
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