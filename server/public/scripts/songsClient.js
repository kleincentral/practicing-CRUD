console.log("Songs sourced!")

function getSongs(){
    axios({
        method: 'GET',
        url: '/songs'
        }).then(function(response) {
            console.log(response.data);
            renderSongs(response.data);
        }).catch(function(error){
            console.log('error in GET', error);
        });
}

function renderSongs(data){
    console.log("Attempt to render!");
    const songs = document.getElementById('viewSongs');
    songs.innerHTML = ''

    for(let i = 0; i < data.length; i+= 1) {
        let index = data[i];
        songs.innerHTML += `
        <tr data-songid=${index.id}>
            <td>${index.songName}</td>
            <td>${index.artist}</td>
            <td>${index.notes}</td>
            <td><button onclick="deleteSong(event)">Delete</button></td>
        </tr>        
        `;
    }
}

function deleteSong(event) {
    event.preventDefault();
    console.log("Attempting to delete!")
    let idOfSong = event.target.closest('tr').getAttribute('data-songid')
    axios({
        method: 'DELETE',
        url: `/songs/${idOfSong}`
        }).then(function(response) {
            getSongs();
        }).catch(function(error){
            console.log('error in GET', error);
        });
}

function addSong(event) {
    event.preventDefault();
    console.log("Create Called!")
    let artist = document.getElementById('artistIn').value;
    let songName = document.getElementById('songNameIn').value;
    let notes = document.getElementById('notesIn').value;
    document.getElementById('artistIn').value = '';
    document.getElementById('songNameIn').value = '';
    document.getElementById('notesIn').value = '';   
    axios({
        method: 'POST',
        url: `/songs`,
        data: {
            artist: artist,
            songName: songName,
            notes: notes
        }
        }).then(function(response) {
            getSongs();
        }).catch(function(error){
            console.log('error in POST', error);
        });
}

function sortBy(event, string) {
    event.preventDefault()
    console.log(string, "Pressed!")
    axios({
        method: `POST`,
        url: `/songs/sortBy`,
        data: {
            sortBy: string
        }
    }).then(function(response) {
        getSongs();
    }).catch(function(error) {
        console.log('error in SORTBY', error)
    })
}

getSongs()