var tanks = [];
var dpsList = [];
var healers = [];

var teamNames = [
    'Eclipse', 'Interstellar', 'Cosmic Shift', 'Starlight', 'Nebula', 'Supernova', 'Galaxy', 'Orbit',
    'Meteor', 'Asteroid', 'Comet', 'Quasar', 'Aurora', 'Solar Flare', 'Pulsar', 'Black Hole',
    'Dark Matter', 'Photon', 'Gravity', 'Zenith', 'Horizon', 'Voyager', 'Lunar', 'Celestial',
    'Nova', 'Spectrum', 'Astro', 'Radiance', 'Infinity', 'Constellation'
];

function addPlayers(role) {
    var inputId = role + 'Input';
    var tableId = role + 'Table';
    var playerNames = document.getElementById(inputId).value.trim();

    if (playerNames !== '') {
        var namesArray = playerNames.split('\n');
        var tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];

        namesArray.forEach(function(playerName) {
            playerName = playerName.trim();
            if (playerName !== '') {
                var newRow = tableBody.insertRow();
                var newCell = newRow.insertCell(0);
                newCell.textContent = playerName;

                if (role === 'tank') {
                    tanks.push(playerName);
                } else if (role === 'dps') {
                    dpsList.push(playerName);
                } else if (role === 'healer') {
                    healers.push(playerName);
                }
            }
        });

        document.getElementById(inputId).value = '';
    }
}

function generateTeams() {
    var groupsContainer = document.getElementById('groups-container');
    groupsContainer.innerHTML = '';

    var numTeams = Math.min(
        Math.floor(tanks.length / 1),
        Math.floor(dpsList.length / 3),
        Math.floor(healers.length / 1),
        teamNames.length
    );

    if (numTeams < 1) {
        alert('Not enough players or team names to generate any teams.');
        return;
    }

    var availableTeamNames = teamNames.slice();

    for (var i = 0; i < numTeams; i++) {
        var teamNameIndex = Math.floor(Math.random() * availableTeamNames.length);
        var teamName = availableTeamNames.splice(teamNameIndex, 1)[0];

        var selectedTank = tanks.splice(Math.floor(Math.random() * tanks.length), 1)[0];
        var selectedHealer = healers.splice(Math.floor(Math.random() * healers.length), 1)[0];

        var selectedDPS = [];
        for (var j = 0; j < 3; j++) {
            var dpsIndex = Math.floor(Math.random() * dpsList.length);
            selectedDPS.push(dpsList.splice(dpsIndex, 1)[0]);
        }

        removePlayerFromTable('tankTable', selectedTank);
        removePlayerFromTable('healerTable', selectedHealer);
        selectedDPS.forEach(function(dps) {
            removePlayerFromTable('dpsTable', dps);
        });

        var teamDiv = document.createElement('div');

        // Add team title
        var teamTitle = document.createElement('div');
        teamTitle.className = 'team-title';
        teamTitle.textContent = 'Team ' + teamName;
        teamDiv.appendChild(teamTitle);

        var teamTable = document.createElement('table');
        teamTable.className = 'groupTable';

        var thead = document.createElement('thead');
        var headerRow = document.createElement('tr');
        var roles = ['Tank', 'DPS 1', 'DPS 2', 'DPS 3', 'Healer'];
        roles.forEach(function(role) {
            var th = document.createElement('th');
            th.textContent = role;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        teamTable.appendChild(thead);

        var tbody = document.createElement('tbody');
        var dataRow = document.createElement('tr');
        [selectedTank].concat(selectedDPS).concat([selectedHealer]).forEach(function(name) {
            var td = document.createElement('td');
            td.textContent = name;
            dataRow.appendChild(td);
        });
        tbody.appendChild(dataRow);
        teamTable.appendChild(tbody);

        teamDiv.appendChild(teamTable);
        groupsContainer.appendChild(teamDiv);
    }
}

function removePlayerFromTable(tableId, playerName) {
    var table = document.getElementById(tableId);
    var tbody = table.getElementsByTagName('tbody')[0];
    var rows = tbody.getElementsByTagName('tr');

    for (var i = rows.length - 1; i >= 0; i--) {
        var cellText = rows[i].cells[0].textContent;
        if (cellText === playerName) {
            tbody.deleteRow(i);
            break;
        }
    }
}
