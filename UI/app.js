function login(e){
    let name=document.getElementById('name').value;
    let passowrd=document.getElementById('password').value;
    const ProxyURL= "https://cors-anywhere.herokuapp.com/"
    fetch('http://localhost:3000/user/login',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        body: JSON.stringify({name: name, password:passowrd})
    })
    .then(res=>res.text())
    .then(res=>console.log(res));
}