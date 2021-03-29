var form = document.getElementById("myForm")





form.addEventListener('submit', function(e) {
    e.preventDefault()

    var search = document.getElementById("search").value

    var originalLogin = search.split(' ').join('')

    document.getElementById("result").innerHTML = ""

    fetch("https://api.github.com/users/" + originalLogin)
        .then((result) => result.json())
        .then((data) => {
            console.log(data)

            document.getElementById("result").innerHTML = `<div class="row">
            <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${data.avatar_url}" />
                    <ul class="list-group list-group-flush mb-3">
                        <li class="list-group-item">Nome: <span class="badge rounded-pill bg-dark">${data.name}</span></li>
                        <li class="list-group-item">Repositórios: <span class="badge rounded-pill bg-success">${data.public_repos}</span></li>
                        <li class="list-group-item">Seguidores: <span class="badge rounded-pill bg-primary">${data.followers}</span></li>
                        <li class="list-group-item">Data entrada: <span class="badge rounded-pill bg-warning text-dark">${data.created_at}</span></li>
                    </ul>
                    <div class="d-grid gap-2 col-6 mx-auto mb-3" style="width: 15rem;">
                        <a href="${data.html_url}" target="_blanck" class="btn btn-danger">Ver perfil no GitHub</a>
                    </div>
                </div>
            </div>
            </div>`;

        })

})

var request = new XMLHttpRequest()


request.open('GET', 'https://api.github.com/orgs/grupotesseract/public_members', true)

request.onload = function() {

    var data = JSON.parse(this.response);

    var statusHTML = '';
    $.each(data, function(i, status) {
        statusHTML += '<tr>';
        statusHTML += '<td>' + status.avatar_url + '</td>';
        statusHTML += '<td>' + status.login + '</td>';
        statusHTML += '</tr>';
    });
    $('tbody').html(statusHTML);
}


request.send();