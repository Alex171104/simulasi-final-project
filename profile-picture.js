function UpdatePP (element) {
    const CurrentImage =element.src;
    //console.log('Update PP')
    console.log(element.src)

    const PPUser = document.getElementById('UserProfile')
    PPUser.src = CurrentImage
}